/* @title: <<nodejs-http2>> program written in Node.js.
 * @desc: A simple helloworld starter with http/2 module.
 * @author: Mustapha Benmbarek.
 * @Copyright © 2019 All rights reserved.
 * @version: 1.0.0
 */

const http2 = require('http2');
const fs = require('fs');

// Configuration of the public key
const server = http2.createSecureServer({
    key: fs.readFileSync('localhost-privatekey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
});

// Configuration of the stream
server.on('stream', (stream, headers) => {
    stream.respond({
        'content-type': 'text/html',
        ':status': 200
    });
    stream.end('<h1>Hello World</h1>');
});

// Raise an exception in case of server error
server.on('error', err => {
    console.error("Exception: " + err.message);
});

// Configuration of the source
const hostname = '127.0.0.1';
const port = process.env.port || 8443;

// Server startup
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});