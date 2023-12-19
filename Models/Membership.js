const mongoose = require('mongoose');

const MembershipSchema = mongoose.Schema({
    CustomerID:{
        type:String,
        required:true,
    },
    Plan:{
        type:Object,
        required:true,
    },
    Trainer:{
        type:Object
    }
})

const MembershipModel = mongoose.model('memberships',MembershipSchema);

module.exports = {
    MembershipModel
}