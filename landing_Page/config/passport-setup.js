const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const keys = require('./keys');
const User = require('../../api/models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({email: profile.emails[0].value}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log("LocalStrategy for email:", username);
    
    // Check if user exists in our database
    try {
        const user = await User.findOne({ email: username });
        
        if (!user) {
            console.log("No user found with this email.");
            return done(null, false, { message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log("User authenticated successfully.");
            return done(null, user);
        } else {
            console.log("Incorrect password for this email.");
            return done(null, false, { message: 'Incorrect password' });
        }
    } catch (err) {
        console.error("Error during LocalStrategy authentication:", err);
        return done(err);
    }
}));


