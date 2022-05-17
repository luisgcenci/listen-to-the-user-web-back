//database config
require('./config/database').connect();
const mongoose = require('mongoose');
require('dotenv').config();

//database models
const feedbackModel = require('./model/feedbackModel');
const clientUserModel = require('./model/clientUserModel')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

//app
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

// const auth = require('./middleware/auth')

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {

    res.send('Homee');
});

// mobile app
app.post('/addfeedback', async (req, res) => {
    let feedback = req.body;

    try{
        const result = await feedbackModel.create({
            service: feedback.service,
            feedbackId: feedback.feedbackId
        });
        
        res.send("Feedback Saved!")
    }catch(e){
        console.log(e);
        res.send("Error, Feedback NOT Saved!")
    }

})

app.get('/getfeedbacks', async (req, res) => {

    try{
        feedbackModel.find({}, (e, feedbacks) => {
            if (e){
                console.log(e);
            }
            res.send(feedbacks);
        });
    }catch(e){
        console.log(e);
        res.redirect('/');
    }
});

//go to mobile app
app.get('/go', (req, res) => {

    res.redirect('exp://exp.host/@luisgcenci/listen-to-the-user-mobile');
})

//redirects user to a feedback form in the mobile app
app.get('/getfeedbackform', async (req, res) => {

    const restaurantId = req.query.restaurantId;
    let newFeedBackId = 0;

    //get next feedbackId
    try{
        feedbackModel.find({}, (e, feedbacks) => {
            if (e){
                console.log(e);
            }

            Object.values(feedbacks).map( (feedback) => {

                let feedbackId = feedback.feedbackId;
                newFeedBackId = newFeedBackId <= feedbackId ? Number(feedbackId) + 1 : newFeedBackId;
            })

            // res.send(newFeedBackId.toString());

            res.redirect('exp://exp.host/@luisgcenci/listen-to-the-user');
        });
    }catch(e){
        console.log(e);
        res.redirect('/');
    }
})

app.post('/isusercpfregistered', async (req, res) => {

    let userData = req.body;
    const cpf = userData.cpf;

    try {
        clientUserModel.find({ cpf: cpf }, (e, users) => {
            if (e){
                res.send(e);
            }
            else if (users.length > 0){
                res.send(users);
            }
            else{
                res.send(false);
            }
        });
    }catch (e){
        res.send('error');
    }
});

//check if user's phone is registered in the database
app.post('/isuserphoneregistered', async (req, res) => {

    const number = req.body.number;
    const authProviders = [];

    try {
        clientUserModel.find({ number: number }, (e, users) => {
            if (e){
                res.send(e);
            }
            else if (users.length > 0){
                users.map((user) => {
                    let userAuthProviders = user.authProviders;
                    userAuthProviders.map((authProvider) => {
                        authProviders.push(authProvider.provider);
                    })
                })
                res.send({authProviders:authProviders});
            }
            else{
                res.send(false);
            }
        });
    }catch (e){
        res.send('error');
    }
});

//check if user's email is registered in the database
app.post('/isuseremailregistered', async (req, res) => {

    const email = req.body.email;
    const authProviders = [];

    try {
        clientUserModel.find({ email: email }, (e, users) => {
            if (e){
                res.send(e);
            }
            else if (users.length > 0){

                users.map((user) => {
                    let userAuthProviders = user.authProviders;
                    userAuthProviders.map((authProvider) => {
                        authProviders.push(authProvider.provider);
                    })
                })
                res.send({authProviders:authProviders});
            }
            else{
                res.send(false);
            }
        });
    }catch (e){
        res.send('error');
    }
});

//register a new client user account
app.post('/addclientuser', async (req, res) => {

    let clientUserData = req.body;

    try{
        const result = await clientUserModel.create({
            name: clientUserData.name,
            cpf: clientUserData.cpf,
            dateOfBirth: clientUserData.dateOfBirth,
            email: clientUserData.email,
            password: clientUserData.password,
            number: clientUserData.number,
            authProviders: clientUserData.authProvider
        });

        res.send("Client User Saved!")
    }catch(e){
        console.log(e);
        res.send("Error, Client User NOT Saved!")
    }
});

//update client user info account
app.post('/updateclientuserinfo', async (req, res) => {

    let clientUserData = req.body;
    const filter = {email: clientUserData.email}
    const update = {
        name: clientUserData.name,
        cpf: clientUserData.cpf,
        dateOfBirth: clientUserData.dateOfBirth,
        email: clientUserData.email,
        password: clientUserData.password,
        number: clientUserData.number
    }
    
    try{
        const result = await clientUserModel.findOneAndUpdate(
            filter,
            update,
            {new: true}
        );

        const providers = clientUserData.authProvider;

        providers.map((provider) => {
            result.authProviders.push(provider);
        })
        result.save();

        res.send('Client User Updated!')
    }catch(e){
        console.log(e);
        res.send('Error, Client User NOT Saved!');
    }

});

