const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.get('/users', (req, res) => {
    res.json({users});
})


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
