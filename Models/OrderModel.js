const mongoose = require('mongoose');

const OrderScheme = mongoose.Schema({
    CustomerID:{
        type:String,
        required:true
    },
    OrderBill:{
        type:Number,
        required:true,
    },
    OrderStatus:{
        type:String,
        required:true,
    },
    Details:{
        type:[],
        default:undefined,
        required:true
    }
})

const OrderModel = mongoose.model('orders',OrderScheme);

module.exports = {
    OrderModel
}