const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile('./log.txt', `${Date.now()}: IP: ${req.ip} ${req.method}: ${req.path}\n`, (err) => {
        next();
    });
    
})

app.use((req, res, next) => {
    // console.log("Hello from middleware 2 ");

    // return res.end("hey!");
    next();
})



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
    res.setHeader('X-myName', 'Akhilesh Yadav'); //Custom header best practices
    
    res.json({users});
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user[0].id === id);
    // console.log(user);
    if(!user) {
        return res.status(404).json({error: "User not found"});
    }
    return res.json({user});
})

app.post('/api/users', (req, res) => {    
    // TODO: Creaet new user
    
    const body = req.body;
    if(!body ||!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
         return res.status(400).json({msg: "All fields are required"});
    }
    users.push({id: users.length + 1,...body});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        // console.log("Error while writing file: " + err);
        res.status(201).json({status: 'Your data has been sent', id: users.length});
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
    let index = users.indexOf(users[id-1]);
    let newUsers = users.splice(index,1);
        
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        res.json({status: 'User Deleted' + users[index]});
    })
    
    
})

app.use((err, req, res, next) => {
    res.status(500).json({msg: "Sorry, something up with our server"});
})


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
