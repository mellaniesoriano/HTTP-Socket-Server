/*jshint esversion: 6*/
const net = require('net');

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

const client = net.connect(80, process.argv[2], () => {
  console.log('connected to port');
  console.log('remote address', client.remoteAddress);

  client.write(`GET / HTTP/1.1
Host: ${client.remoteAddress}
Connection: close\r\n\r\n`);

  // writes msg to server
  process.stdin.on('data', (data) => {
    console.log('checking data', data.toString());
  });

  // receives msg from server
  client.on('data', (data) => {
    console.log(data.toString());
  });
});