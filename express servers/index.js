const express = require("express");

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello from Home Page");
})

app.get('/about', (req, res) => {
    console.log("Hello from about Page " + 'hey ' + req.query.name);
    return res.send("Hello from about Page " + 'hey ' + req.query.name);
})



    


app.listen(8000, () => console.log("App is listing at PORT 8000"));