const {Router} = require('express');
const {authenticate} = require('../Middlewares/authenticate');
const {ClubModel} = require('../Models/ClubModel');
const {authorize} = require('../Middlewares/authorize')

const clubRouter = Router();

clubRouter.get('/',authenticate,async(req,res)=>{
    try {
        const Clubs = await ClubModel.find({});
       
        res.status(200).send({"Clubs":Clubs});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

clubRouter.get('/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const Club = await ClubModel.findOne({_id:id});
        res.status(200).send({"Club":Club})
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

clubRouter.post('/create',authenticate,authorize,async(req,res)=>{
    const {Name,Area,City,BasePrice,Description,Images,Tags,Trainers} = req.body;
    try {
        const New_Club = new ClubModel({
            Name,
            Area,
            City,
            BasePrice,
            Description,
            Images,
            Tags,
            Trainers
        });
        await New_Club.save();
        res.status(201).send({"Message":"Club added!","Club":New_Club});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

clubRouter.patch('/updateclub/:id',authenticate,authorize,async(req,res)=>{
    const Data = req.body;
    const {id} = req.params;
    try {
        const Club = await ClubModel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(200).send({"Message":"Club Updated!","Club":Club});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

clubRouter.delete('/deleteclub/:id',authenticate,authorize,async(req,res)=>{
    const {id} = req.params;
    try {
        const Club = await ClubModel.finOneAndDelete({_id:id});
        res.status(200).send({"Message":"Club Deleted","Club":Club});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

module.exports = {
    clubRouter
}