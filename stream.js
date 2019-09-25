// ***************************** Chaining STREAM
const fs = require("fs");
const zlib = require('zlib');

// Compress the file input.txt to input.txt.gz - NÉN
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));
// Decompress the file input.txt.gz to input.txt - GIẢI NÉN
// fs.createReadStream('input.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('input.txt'));

// ------------------------------------------
// const fs = require('fs');
// const server = require('http').createServer();


// // *** Now let's reduce this. it;s only losted abot 25MB
// server.on('request', (req,res) => {
//     const src = fs.createReadStream('./big.file');
//     src.pipe(res);
// })
// // *** RAM was losted about 800 MB to load data on WINDOWS 10 - Chrome
// // server.on('request', (req, res) => {
// //     fs.readFile('./big.file', (err, data) => {
// //         if (err) throw err;

// //         res.end(data);
// //     });
// // });

// server.listen(8000);

// ************** Create 1 million line code
// const fs = require('fs');
// const file = fs.createWriteStream('./big.file');

// for (let i = 0; i <= 1e6; i++) {
//     file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n');
// }

// file.end();