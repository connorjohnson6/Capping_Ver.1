const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../api/models/user-model');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

// auth with google oauth api
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

router.get('/check-availability', async (req, res) => {
    try {
        const emailExists = await User.findOne({ email: req.query.email });
        const usernameExists = await User.findOne({ username: req.query.username });

        res.json({
            emailExists: !!emailExists,
            usernameExists: !!usernameExists
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// custom registration
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if user with provided email or username exists
        const existingUser = await User.findOne({ $or: [{email: email}, {username: username}] });
        if (existingUser) {
            req.flash('error', 'An account with this email or username already exists.');
            return res.redirect('/auth/login');
        }

        // Hash password and save new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        
        // Automatically log in the user after registration
        req.login(newUser, function(err) {
            if (err) {
                console.error("Error during auto login after registration:", err);
                return res.redirect('/auth/login');
            }
            return res.redirect('/profile');
        });

    } catch (err) {
        console.error(err);
        req.flash('error', 'Server error. Registration failed.');
        res.redirect('/auth/login');
    }
});


// custom login
router.post('/login', (req, res, next) => {
    console.log("Received login POST request with data:", req.body);
    passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
    failureFlash: true
})(req, res, next);  // Important: this line was missing in my previous modification
console.log("After Passport authentication");

});



module.exports = router;


