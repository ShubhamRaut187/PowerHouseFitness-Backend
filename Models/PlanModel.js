const mongoose = require('mongoose');

const PlanScheme = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Validity:{
        type:Number,
        required:true
    },
    Facilities:{
        type:[String],
        default:undefined,
        required:true
    }
})

const PlanModel = mongoose.model('plans',PlanScheme);

module.exports = {
    PlanModel
}