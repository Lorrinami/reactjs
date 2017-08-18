var http = require('http');
http.createServer(function(req,res){ res.writeHead(200,{'Content-Type':'text/plain'});
res.end('Hello body!');}).listen(3000,'104.199.227.80');
console.log('NodeJS Server sunning at ');