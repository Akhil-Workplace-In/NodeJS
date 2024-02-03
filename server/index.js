const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New req Received\n`
    fs.appendFile('./log.txt', log, (err, data) => {

        switch(req.url){
            case '/': res.end("Home Page");
            break
            case '/about': res.end("I am Akhil");
            break
            default:
                res.end('404 Not Found');
        }
        // res.end("Hello From Server Again");
    })
   
    
})


myServer.listen(8000, () => console.log('Server Started at Port: ' + 8000));