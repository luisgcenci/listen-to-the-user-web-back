const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {

    //Connecting to DB...
    console.log("Connecting to DB...")

    const config = process.env;

    await mongoose.connect(
        config.MONGO_URI,
        function (err){

            if (err){
                console.log('Connection Failed: ' + err);
            }
            else{
                console.log("connected to db"); 
            }
        }
    )
}