const mongoose = require('mongoose');

const ProductScheme = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    MRP:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
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
    }
});

const ProductModel = mongoose.model('products',ProductScheme);

module.exports = {
    ProductModel
}