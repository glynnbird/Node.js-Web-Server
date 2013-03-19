
// we need the express framework
var express = require('express');
var app = express();

// use compression where appropriate
app.use(express.compress());

// server out our static directory as static files
app.use(express.static(__dirname+'/public'));

// listen on port 8000
app.listen(8000);
console.log("Visit http://localhost:8000/");

