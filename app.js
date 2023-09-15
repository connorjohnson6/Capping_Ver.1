const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');


const app = express();
const port = 3000

mongoose.set('strictQuery', true);

// Set Templating Engine
app.set('view engine', 'ejs')

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch(err => {
        console.error('Error connecting to mongodb:', err);
    });


app.use(express.static('public') );

//set up routes
app.use('/auth', authRoutes);


//Navigation
app.get('', (req, res) =>{
    res.render('index')
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