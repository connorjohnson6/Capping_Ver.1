const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000

mongoose.set('strictQuery', true);

// Set Templating Engine
app.set('view engine', 'ejs')

app.use(bodyParser.json());  // to handle JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));  // to handle URL-encoded payloads

// Express session setup
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false
}));

// Flash messages
app.use(flash());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch(err => {
        console.error('Error connecting to mongodb:', err);
    });

app.use(express.static('public'));

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Navigation
app.get('', (req, res) => {
    res.render('index')
});

//blog tab
app.get('/goals', (req, res) =>{
    res.render('goals')
})

//blog tab
app.get('/blog', (req, res) =>{
    res.render('blog')
})

//about me tab
app.get('/about', (req, res) =>{
    res.render('about')
})

//about me tab
app.get('/login', (req, res) =>{
    res.render('login')
})

//404 page
app.use(function(req, res, next){
    res.status(404).render('404')
  });

//Listeing to Port 3000
app.listen(port, ()=> console.info(`App listening on port ${port}`))