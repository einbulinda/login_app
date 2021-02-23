var express = require('express');
var ejs = require('ejs');

// Creating a server with express module.
var app = express();

// set view engine to ejs
app.set('view engine','ejs');

// Serving static files for website
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/register',(req,res)=>{
    res.render('register');
})





const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})