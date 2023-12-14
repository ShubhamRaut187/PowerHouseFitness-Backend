const mongoose = require('mongoose');

const ClubScheme = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Area:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    BasePrice:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Images:{
        type:[String],
        default:undefined,
        required:true
    },
    Tags:{
        type:[String],
        default:undefined,
        required:true
    },
    Trainers:{
        type:[],
        default:undefined,
        required:true
    }
})

const ClubModel = mongoose.model('models',ClubScheme);

module.exports={
    ClubModel
}