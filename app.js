var express = require('express');
var ejs = require('ejs');

// Creating a server with express module.
var app = express();

// set view engine to ejs
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})





const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})