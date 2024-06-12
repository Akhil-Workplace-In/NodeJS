const fs = require("fs");


//sync... task
// fs.writeFileSync('./test.txt', 'Hello world'); //blocking task

// Async... task
// fs.writeFile('./test.txt', "Hello fdfworld", (err) => { //non blocking task
//     console.log(err);
// })


//Sync
// const result = fs.readFileSync('./contacts.txt', 'utf-8')
// console.log(result);

// async...
// fs.readFile('./contacts.txt', 'utf-8',(error, data) => {
//     console.log(data);
// })

// to append data in file sync..
// fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString());

// fs.cpSync()

// fs.unlinkSync()

// console.log(fs.statSync('./test.txt'));

// fs.mkdirSync("my-docs/index.js", {recursive: true}); //for creating new directory recursively