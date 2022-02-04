//database config
require('./config/database').connect();
const mongoose = require('mongoose');
require('dotenv').config();

//database models
const feedbackModel = require('./model/feedbackModel');
// const UserModel = require('./model/UserModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

//app
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());

// const bodyParser = require('body-parser');
// const auth = require('./middleware/auth')

app.listen(port, () => console.log(`Listening on port ${port}`));
// app.use(bodyParser());
// app.use(express.json);

app.get('/', (req, res) =>{

    try{
        testModel.find({}, (e, tests) => {
            if (e){
                console.log(e);
            }
            console.log(tests);
        });
    }catch(e){
        console.log(e);
    }

    res.send('Home');
});

app.post('/add/:channel', (req, res) =>{

    var channel = req.params.channel;
    console.log(channel);

    // try{
    //     feedbackModel.create({
    //         canal: channel,
    //     })
    // }catch(e){
    //     console.log(e);
    // }

    res.send(channel);
});