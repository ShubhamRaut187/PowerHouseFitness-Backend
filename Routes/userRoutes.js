const {Router} = require('express');
const {authenticate} = require('../Middlewares/authenticate');
const {UserModel} = require('../Models/User.model');
const {authorize} = require('../Middlewares/authorize');
// const { productRouter } = require('./productRoutes');

const userRouter = Router();

userRouter.get('/',authenticate,authorize,async(req,res)=>{
    try {
        const Users = await UserModel.find({});
        res.status(200).send({"User":Users});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

userRouter.get('/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const User = await UserModel.findOne({_id:id})
        res.status(200).send({"User":User})
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

userRouter.patch('/updateuser/:id',authenticate,async(req,res)=>{
    const Data = req.body;
    const {id} = req.params;
    try {
        const User = await UserModel.findOneAndUpdate({_id:id},Data,{new:true});
        res.status(200).send({"Message":"User Updated!","User":User});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

userRouter.delete('/deleteuser/:id',authenticate,async(req,res)=>{
    const {id} = req.params;
    try {
        const User = await UserModel.findOneAndDelete({_id:id});
        res.status(200).send({"Message":"User Deleted","User":User});
    } catch (error) {
        console.log(error);
        res.status(500).send({"Message":"Something Went Wrong","Error":error});
    }
})

module.exports = {
    userRouter
}