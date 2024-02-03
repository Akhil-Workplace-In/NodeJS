const fs = require('fs');

// //synchronous call (real time)
// fs.writeFileSync('./test.txt', 'Hello World!');

// Asynchronous call

// fs.writeFile('./test.txt', "Hello World", (err) => {});

// const result = fs.readFile('./contacts.txt', "utf-8", (err, data) => {
//     if(err){
//         console.log("Error ", err);
//     }else{
//         console.log(data);
//     }
   
// });

// fs.appendFileSync('./contacts.txt', new Date().getDate().toLocaleString());
// fs.appendFileSync('./contacts.txt', `${Date.now()} Hey there`);

// fs.cpSync('./contacts.txt', './copy.txt');

// fs.unlinkSync('./copy.txt');

// console.log(fs.statSync('./contacts.txt').isFile());

fs.mkdirSync('my-docss/a/b', {recursive: true});