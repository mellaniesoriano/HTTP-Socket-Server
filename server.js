/* jshint esversion: 6 */

const net = require('net');
const fs = require('fs');

const fetchHtmlFiles = (fileName) => fs.readFileSync(fileName);

const indexHTML = fetchHtmlFiles('./public/index.html');
const hydrogenHTML = fetchHtmlFiles('./public/hydrogen.html');
const heliumHTML = fetchHtmlFiles('./public/helium.html');
const error404 = fetchHtmlFiles('./public/404.html');
const cssStyles = fetchHtmlFiles('./public/css/styles.css');

const server = net.createServer( (request) => {
  request.on('data', (data) => {
    const dataArr = data.toString().split('\n');
    const requestLine = dataArr[0].split(' ');
    const path = requestLine[1];

    switch (path) {
      case '/':
      case '/index':
      case '/index.html':
      writeHeader(request, '200 OK', 'text/html', indexHTML);
      request.end();
      break;

      case '/hydrogen':
      case '/hydrogen.html':
      writeHeader(request, '200 OK', 'text/html', hydrogenHTML);
      request.end();
      break;

      case '/helium':
      case '/helium.html':
      writeHeader(request, '200 OK', 'text/html', heliumHTML);
      request.end();
      break;

      case '/css/styles.css':
      writeHeader(request, '200 OK', 'text/css', cssStyles);
      request.end();
      break;

      case '404':
      case '404.html':
      writeHeader(request, '200 OK', 'text/html', error404);
      request.end();
      break;

      default:
      writeHeader(request, '404 BAD_REQUEST', 'text/html', error404);
      request.end();
    }
  });
});

const writeHeader = (request, status, fileType, fileName) => {
  request.write(`HTTP/1.1 ${status}
Server: Mellanie's Super Awesome Server
Date: ${new Date().toUTCString()};
Content-Type: ${fileType}; charset=utf-8
Content-Length: ${fileName.length}
Connection: keep-alive

${fileName}`);
};


server.listen(8080, () => console.log(`Server listening on port 8080`));