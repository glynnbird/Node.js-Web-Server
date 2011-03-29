var sys = require('sys'), 
    fs = require('fs'), 
    http = require('http');
var parse = require('url').parse;         

// a simple web server, serving out static files with the correct mime type
http.createServer(function (req, res) {
  
  // work out which file is being requested
  var path = parse(req.url).pathname;
  
  // if the path ends in a forward slash
  if(path.match(/\/$/)) {
    // assume index.html
    path += "index.html";
  }
  
  // make path relative to "."
  path = "."+path;

  // load the file
  fs.readFile(path, function (err, data) {
    if(!err) {     
      // extract file type
      var filetype=path.match(/\.[a-zA-Z]+$/)[0];
      
      // work out the mime type
      var ct;
      switch(filetype) {
        case ".htm": 
        case ".html": ct="text/html"; break;
        case ".js": ct="text/javascript"; break;
        case ".css": ct="text/css"; break;
        case ".png": ct="image/png"; break;
        case ".jpg": ct="image/jpg"; break;
        case ".gif": ct="image/gif"; break;
        default: ct = "text/plain";
      }
      
      // HTTP 200 header
      res.writeHead(200, {'Content-Type': ct});
      
      // and end the connection with the contents of the static file
      return res.end(data);
    } else {
      // sorry 404
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('File not found\n');          
    }
  });
}).listen(8000);
