const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>    
    `;
    res.send(html);
})

// REST API

app.get('/api/users', (req, res) => {
    res.json({users});
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    // console.log(user);
    return res.json({user});
})

app.post('/api/users', (req, res) => {    
    // TODO: Creaet new user
    const body = req.body;
    users.push({id: users.length + 1,...body});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        // console.log("Error while writing file: " + err);
        res.json({status: 'Done', id: users.length});
    });

    
    
})


app.patch('/api/users/:id', (req, res) =>{
    //TODO: Edit the user with id
    const body = req.body;
    const id = Number(req.params.id);
    

    const propertiesOfUserObj = Object.keys(users[id-1]);
    const propertiesOfBodyObj = Object.keys(body);
    
    (propertiesOfUserObj).forEach(elementOfU => { 
        propertiesOfBodyObj.forEach(elementOfB => {
        if(elementOfU == elementOfB){
            // console.log(elementOfU);
            users[id-1][elementOfU]= body[elementOfB];
            
        }
    });        
    });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        // console.log("Error while writing file: " + err);
        return res.json({status: 'Updated', id: users.length});
    });


    
})

app.delete('/api/users/:id', (req, res) => {
    // TODO: Delete the user with id
    const id = req.params.id;
    let result = arr.find((n) => n == 3);

    res.json({status: 'pending...'});
})




app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
