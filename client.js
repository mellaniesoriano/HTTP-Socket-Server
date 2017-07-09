/* jshint esversion: 6 */

const net = require('net');

var host = process.argv[2];
var port = 80;

var responseHeader = [];
var responseBody = [];

var request = new net.Socket();

if (!host) {
  console.log("Oops, that didn't work! Learn how to use node : $ node -h client.js");
} else {

  if (host.indexOf(':') > -1) {
    port = host.split(':')[1];
    host = host.split(':')[0];
  }


  var path2 = host.split('/')[1];
  console.log('checking this port...', path2);


  const client = net.connect(port, host, () => {
    console.log('client connected');
  });

  client.write(`GET / HTTP/1.1
Date: ${new Date().toUTCString()}
Host: ${host}
User-Agent: Melly Beans
Connection: close\r\n\r\n`);

  client.on('data', (data) => {
    var header = data.toString().split('\n\n')[0];
    var body = data.toString().split('\n\n')[0];
    responseHeader.push(header);
    responseHeader = responseHeader.toString().substr(0, data.indexOf('\r\n\r\n'));
    responseBody.push(body);
    responseBody = responseBody.toString().substr(data.indexOf('\r\n\r\n'), data.length);
    // console.log(responseBody.toString().substr(data.indexOf('\r\n\r\n'), data.length));

    if (process.argv[3] === '-H') {
      process.stdout.write();
    } else {
      process.stdout.write(`${responseHeader}, ${responseBody}`);

    }
    client.destroy();
  });


  client.on('close', () => {
    console.log("connection closed");
  });
}
