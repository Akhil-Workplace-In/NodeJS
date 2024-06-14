const express = require("express");

const fs = require("fs");
const mongoose = require("mongoose");
const { timeStamp } = require("console");


const app = express();
const PORT = 8000;

//Mongodb Connection

mongoose.connect("mongodb://127.0.0.1:27017/Project-db-1")
.then(() => console.log("Mongodb Connectd"))
.catch((err) => console.log("Mongo Error: ", err));



//Schema  //Define the structure

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String, 
        required: false,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,

    },
    gender: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
    }, 
  },
  {timestamps: true}
)

// Create model from schema(structure)

const User = mongoose.model('user', userSchema);


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



app.get('/users', async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`)}
    </ul>    
    `;
    res.send(html);
})

// REST API

app.get('/api/users', async(req, res) => {
    const allDbUsers = await User.find({});
    res.setHeader('X-myName', 'Akhilesh Yadav'); //Custom header best practices
    
    res.json({allDbUsers});
})

app.get('/api/users/:id', async(req, res) => {
    const user = await User.findById(req.params.id)
    
    
    
    if(!user) {
        return res.status(404).json({error: "User not found"});
    }
    return res.json({user});
})

app.post('/api/users', async(req, res) => {    
    // TODO: Creaet new user
    
    const body = req.body;
    if(!body 
        || !body.first_name 
        || !body.last_name 
        || !body.email 
        || !body.gender 
        || !body.job_title) {
         return res.status(400).json({msg: "All fields are required"});
    }
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    console.log("Data create result: ", result);

    return res.status(201).json({
        msg: "Success! User Created"

    })
    
    
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
