const {Router} = require('express');
const {authenticate} = require('../Middlewares/authenticate');
const {MembershipModel} = require('../Models/Membership');
const {authorize} = require('../Middlewares/authorize');

const membershipRouter = Router();

membershipRouter.get('/',authenticate,authorize,async(req,res)=>{
    try {
        const Memberships = await MembershipModel.find({});
        res.status(200).send({"Memberships":Memberships});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

membershipRouter.get('/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Membership = await MembershipModel.findOne({_id:id});
        res.status(200).send({"Membership":Membership})
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})


membershipRouter.post('/create',authenticate,async(req,res)=>{
    const {CustomerID,Plan,Trainer} = req.body;
    try {
        const New_Membership = new MembershipModel({
          CustomerID,
          Plan,
          Trainer
        });
        await New_Membership.save();
        res.status(201).send({"Message":"Membership added!","Membership":New_Membership});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})


membershipRouter.delete('/deletemembership/:id',authenticate,authorize,async(req,res)=>{
    const {id} = req.params;
    try {
        const Membership = await MembershipModel.finOneAndDelete({_id:id});
        res.status(200).send({"Message":"Membership Deleted","Membership":Membership});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

module.exports = {
    membershipRouter
}