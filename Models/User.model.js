const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserScheme = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        unique:true,
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
    },
    Role:{
        type:String,
        default:"User",
        required:true
    },
    Membership:{
        type:Object,
        default:{
            Name:"Buy a membership!"
        }
    }

})

const UserModel = mongoose.model('users',UserScheme);

module.exports = {
    UserModel
}