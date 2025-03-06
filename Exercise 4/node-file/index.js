var http = require('http');
const fs = require('fs');
const {readFile} = require('./file');
const hostname = "localhost";
const port = 8082;

const path = require('path');

// Exercise 1
http.createServer((request, respond) => {
    // Send the HTTP header
    console.log(request.headers);
    // Send the respond body of file
    const fileName = 'index.html';
    readFile(fileName)
    .then(data => {
        respond.setHeader('Content-Type', 'text/html');
        respond.statusCode = 200;
        //respond.end(data);
        fs.createReadStream(fileName).pipe(respond);
    }).catch(err => {
        console.log('Error reading file: ', err);
        respond.statusCode = 500;
        respond.end('Internal Server Error');
    });
}).listen(port);

// Exercise 2
// const server = http.createServer((req, res) => {
//     console.log('Request for ' + req.url + ' by method ' + req.method);

//     if (req.method == 'GET') {
//         var fileUrl;
//         if (req.url == '/') fileUrl = '/index.html';
//         else fileUrl = req.url;

//         var filePath = path.resolve('./public' + fileUrl);
//         const fileExt = path.extname(filePath);
//         if (fileExt == '.html') {
//             fs.exists(filePath, (exists) => {
//                 if (!exists) {
//                     res.statusCode = 404;
//                     res.setHeader('Content-Type', 'text/html');
//                     res.end('<html><body><h1>error 404: ' + fileUrl + ' not found</h1></body></html>');
//                 }
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'text/html');
//                 fs.createReadStream(filePath).pipe(res);
//             });
//         }
//         else {
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             res.end('<html><body><h1>error 404: ' + fileUrl + ' not found</h1></body></html>');
//         }
//     }
//     else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<html><body><h1>error 404: ' + req.method + ' not supported</h1></body></html>');
//     }
// }).listen(port);

// //Console will print the message
// console.log(`Server running at http://${hostname}:${port}/`);