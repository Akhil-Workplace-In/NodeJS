const http = require('http');
const fs = require('fs');
const url = require("url");
const express = require("express");
const app = express();

app.get('/', (req, res)=>{
    return res.send('Hello from home Page');
})

app.get('/about', (req, res)=>{
    return res.send('Hello from About Page');
})

function myHandler(req, res){
    if(req.url === "/favicon.ico") return res.end();

    const date = new Date().toString(); // date in string format
    const log = `New req Received\n Date: ${date}
    Method: ${req.method}
    Url: ${req.url}\n`;

    const myUrl = url.parse(req.url, true);
    // console.log(myUrl);

    fs.appendFile('./log.txt', log  , (err, data) => {

        switch(myUrl.pathname){
            case '/': res.end("Home Page");
            break
            case '/about': 
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
            break
            default:
                res.end('404 Not Found');
        }
        // res.end("Hello From Server Again");
    })
   
    
};

const myServer = http.createServer(myHandler);

myServer.listen(8000, () => console.log('Server Started at Port: ' + 8000));