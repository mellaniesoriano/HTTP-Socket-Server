/* jshint esversion: 6 */

const net = require('net');

var host = process.argv[2];
var port = 80;

if (host.indexOf(':') > -1){
  port = host.split(':')[1];
  host = host.split(':')[0];
}
if (!host) {
  console.log('Invalid host. Please use node client.js <URL>');
}

const client = net.connect(port, host, () => {
  console.log('client connected');
});

client.write(`GET / HTTP/1.1
Date: ${new Date().toUTCString()}
Host: ${host}
User-Agent: Melly Beans
Connection: close\r\n\r\n`);

client.on('data', (data) => {
    process.stdout.write(data);
});

client.on('close', () => {
  console.log("connection closed");
});
