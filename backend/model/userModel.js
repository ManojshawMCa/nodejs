

 //User model should have First Name, Last Name, Email, and Contact No.

 const mongoose = require('mongoose');
 const userSchema = mongoose.Schema({
    FirstName : {
        type: String,
        require: [true,"Please enter the First name"]

    },
    Lastname : {
        type: String,
        require: [true,"Please enter the Last name"]
    },
    Email: {
        type: String,
        require: [true,"Please enter the Email name"]
    },
    ContactNo: {
        type: String,
        require: [true,"Please enter the ContactNo"]
    }
 },
 {
    timestamps:true
 }
 );

 const userModel = mongoose.model("User" , userSchema);
 
 module.exports = userModel;


