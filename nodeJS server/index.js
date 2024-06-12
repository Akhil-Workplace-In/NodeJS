const http = require("http");
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res)=> {  
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url} New req Received\n`;
    const myUrl = url.parse(req.url);   

    fs.appendFile('./log.txt', log, (err, data) => {
        switch(myUrl.pathname){
            case '/':
                res.end("HomePage");
                break;
            case '/about':
                res.end("I am Akhilesh Yadav");
                break;
            default:
                res.end("4004: not found")                
        }
        
    });
    
    
    
});

myServer.listen(8000, () => console.log("Serve started.."));


