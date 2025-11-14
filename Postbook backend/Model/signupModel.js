const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    fname :{
        required :true,
        type : String
    },
    lname :{
        required : true,
        type : String
    },
    email :{
        required : true,
        type : String
    },
    user :{
        required : true,
        type : String
    },
    password :{
        required : true,
        type : String
    },
    cpassword :{
        required : true,
        type : String
    },
});

module.exports = mongoose.model('Users',signupSchema);