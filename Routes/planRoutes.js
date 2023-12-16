const {Router} = require('express');
const {authenticate} = require('../Middlewares/authenticate');
const {PlanModel} = require('../Models/PlanModel');
const {authorize} = require('../Middlewares/authorize')

const planRouter = Router();

planRouter.get('/',authenticate,async(req,res)=>{
    try {
        const Plans = await PlanModel.find({});
        res.status(200).send({"Plans":Plans});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

planRouter.get('/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Plan = await PlanModel.findOne({_id:id});
        res.status(200).send({"Plan":Plan})
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

planRouter.post('/create',authenticate,authorize,async(req,res)=>{
    const {Name,Price,Validity,Facilities} = req.body;
    try {
        const New_Plan = new PlanModel({
           Name,
           Price,
           Validity,
           Facilities
        });
        await New_Plan.save();
        res.status(201).send({"Message":"Plan added!","Plan":New_Plan});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

planRouter.patch('/updateplan/:id',authenticate,authorize,async(req,res)=>{
    const Data = req.body;
    const {id} = req.params;
    try {
        const Plan = await PlanModel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(200).send({"Message":"Plan Updated!","Plan":Plan});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

planRouter.delete('/deleteplan/:id',authenticate,authorize,async(req,res)=>{
    const {id} = req.params;
    try {
        const Plan = await PlanModel.finOneAndDelete({_id:id});
        res.status(200).send({"Message":"Plan Deleted","Plan":Plan});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})


module.exports = {
    planRouter
}