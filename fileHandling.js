const fs = require('fs');
const os = require('os');

console.log(os.cpus().length);

// console.log('1');

// Blocking... 
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// fs.readFile('./contacts.txt', "utf-8", (err, data) => {
//     if(err){
//         console.log("Error", err)
//     }else{
//         console.log(data);
//     }
// })
// console.log(result);

// console.log('2');
// console.log("3");
// console.log("4");
