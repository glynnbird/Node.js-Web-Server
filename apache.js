
// we need the express framework
const express = require('express')
const app = express()

// server out our static directory as static files
app.use(express.static(__dirname+'/public'))

// listen on port 8000
app.listen(8000)
console.log("Visit http://localhost:8000/")

