const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Mobile:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    }   
})

const UserModel = mongoose.model('users',UserScheme);

module.exports = {
    UserScheme
}