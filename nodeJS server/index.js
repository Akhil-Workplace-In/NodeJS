const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res)=> {    
    const log = `${Date.now()}: ${req.url} New req Received\n`;
    fs.appendFile('./log.txt', log, (err, data) => {
        switch(req.url){
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


