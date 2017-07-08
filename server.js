/* jshint esversion: 6 */

const net = require('net');
const fs = require('fs');

const indexHTML = fs.readFileSync('./public/index.html');
const hydrogenHTML = fs.readFileSync('./public/hydrogen.html');
const heliumHTML = fs.readFileSync('./public/helium.html');
const error404 = fs.readFileSync('./public/404.html');
const cssStyles = fs.readFileSync('./public/css/styles.css');

const server = net.createServer( (request) => {
  request.on('data', (data) => {
    const dataArr = data.toString().split('\n');
    const requestLine = dataArr[0].split(' ');
    const path = requestLine[1];

    switch (path) {
      case '/':
      request.write(writeHeader('200 OK', 'text/html', indexHTML));
      request.end();

      break;

      case '/index.html':
      request.write(writeHeader('200 OK', 'text/html', indexHTML));
      request.end();
      break;

      case '/hydrogen.html':
      request.write(writeHeader('200 OK', 'text/html', hydrogenHTML));
      request.end();
      break;

      case '/helium.html':
      request.write(writeHeader('200 OK', 'text/html', heliumHTML));
      request.end();
      break;

      case '/public/css/styles.css':
      request.write(writeHeader('200 OK', 'text/css', cssStyles));
      request.end();
      break;

      default:
      request.write(writeHeader('404 BAD_REQUEST', 'text/html', error404));
      request.end();
    }
  });
});

function writeHeader(status, fileType, fileName) {
  return `HTTP/1.1 ${status}
Server: Mellanie's Super Awesome Server
Date: ${new Date().toUTCString()};
Content-Type: ${fileType}; charset=utf-8
Content-Length: ${fileName.length}
Connection: keep-alive

${fileName}`;
}

server.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});