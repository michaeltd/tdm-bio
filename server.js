/*
var http = require('http'), fs = require('fs')

var port = process.env.PORT || 3000

http.createServer(function(req, res) {
  var url = './' + (req.url == '/' ? 'bio-cv.html' : req.url)
  fs.readFile(url, function(err, html) {
    if (err) {
      var message404 = "There is no such page! <a href='/'>Back to home page</a>"
      res.writeHead(404, {'Content-Type': 'text/html', 'Content-Length': message404.length})
      res.write(message404)
    } else {
      res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length})
      res.write(html)
    }
    res.end()
  })
}).listen(port)
*/

var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  port = process.env.PORT || 3000,
  mimeTypes = {
      "html": "text/html",
      "jpeg": "image/jpeg",
      "jpg": "image/jpeg",
      "png": "image/png",
      "pdf": "application/pdf",
      "js": "text/javascript",
      "css": "text/css"
    };

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory())
      filename += '/bio-cv.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var mimeType = mimeTypes[filename.split('.').pop()];

      if (!mimeType) {
        mimeType = 'text/plain';
      }

      response.writeHead(200, { "Content-Type": mimeType });
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port));

//console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
