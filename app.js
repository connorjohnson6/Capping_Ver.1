const express = require('express');




const app = express();
const port = 3000



// Set Templating Engine
app.set('view engine', 'ejs')

app.use(express.static("public") );

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

//404 page
app.use(function(req, res, next){
    res.status(404).render('404')
  });

//Listeing to Port 3000
app.listen(port, ()=> console.info(`App listening on port ${port}`))

