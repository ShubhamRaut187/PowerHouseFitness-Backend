const mongoose = require('mongoose');

const MembershipSchema = mongoose.Schema({
    CustomerID:{
        type:String,
        required:true,
    },
    PlanID:{
        type:String,
        required:true,
    }
})

const MembershipModel = mongoose.model('memberships',MembershipSchema);

module.exports = {
    MembershipModel
}