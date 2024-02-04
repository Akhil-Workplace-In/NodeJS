const express = require("express");
const http = require("http");
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to home Page")
})

app.get("/about", (req, res) =>{
    return res.send(`Hello ${req.query.name}`);
})
// const myServer = http.createServer(app)

// myServer.listen(8000, ()=> {
//     console.log("Sever started at port: 8000");
// })

app.listen(8000, () => console.log("Sever started at port: 8000"))