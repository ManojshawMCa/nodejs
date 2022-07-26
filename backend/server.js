
const express = require('express');
var cors = require("cors");
const os = require('os');
const app = express();
const dotenv = require('dotenv').config();
const logger = require('morgan');
const port = process.env.PORT || 5000;
const User = require('./model/userModel')

const fs = require('fs');
const corsOptions = {
      origin: ["http://localhost:3000"],
    credentials: true,
  };
  app.use(cors(corsOptions));

const { errorHandler } = require('./errorHandler');

// require database connection 
const dbConnect = require("./DB/config");
const { dirname } = require('path');
// execute database connection 
dbConnect();
console.log('platform : ' + os.platform);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:false }))

app.get('/movielist' , (req,res) => {
    fs.readFile(__dirname + '/' + 'movielist.json', 'utf8', (err,data) => {
        res.send(data);
    })
})


// Fetch All user
app.get('/User' , (req,res) => {
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      });

})
//Create User
app.post('/User' , (req,res) => {
    //res.send({message: 'hello'});
    const { FirstName , LastName , Email , ContactNo } = req.body;
    //res.send({message: req.body});
    
    if(!FirstName || !LastName || !Email || !ContactNo){
        res.status(400)
        throw new Error('All fields are required')
    }
    // Create UESR 
    const user = User.create({
        FirstName,
        LastName,
        Email,
        ContactNo,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            message: user
        })
    }else {
        res.status(400)
        throw new Error('Invalid parameters')
    }
})


//Update User
app.put('/User' , (req,res) => {
    //res.send({message: 'hello'});
    User.findByIdAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err) throw err;
        res.send({message:"1 document updated"});
    });
})



//Delete User
/*app.delete('/User', (req,res) => {

    User.findOneAndDelete({ _id: req.body._id }, (err,result) => {
           if (err) throw err;
            res.send({message:"1 document deleted"});
    });
   
})*/

//Delete User
app.delete('/User/:id', (req,res) => {
    User.findByIdAndDelete(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
   
})

// for custom Error HAndling
app.use(errorHandler);
app.listen(port,()=> {
    console.log(`server is started on ${port}` );
})