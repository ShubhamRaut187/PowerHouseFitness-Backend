const {Router} = require('express');
const {UserModel} = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticationRouter = Router();

authenticationRouter.post('/signup',async(req,res)=>{
    const {Name,Email,Mobile,Password,Address,Role} = req.body;
    // const User = await UserModel.findOne({Email});
    // if(User){
    //     res.status(406).send({"Message":"Email address already user!"})
    // }
    // const Plan = {};
    // console.log(Membership);
    const HashedPassword = bcrypt.hashSync(Password,8);
    const New_User = new UserModel({
        Name,
        Email,
        Mobile,
        Password:HashedPassword,
        Address,
        Role
    });
    try {
        await New_User.save();
        res.status(201).send({"Message":"SignUp Successful","User":New_User});
    } catch (error) {
        res.status(500).send({"Message":"Something Went Wrong, try again","Error":error});
    }
})

authenticationRouter.post('/login',async(req,res)=>{
    const {Email,Password} = req.body;
    const User = await UserModel.findOne({Email});
    if(!User){
        res.status(404).send({"Message":"User not registered, Please Signup!"});
    }
    const hash = User.Password;
    const Correct_Password = bcrypt.compareSync(Password,hash);
    if(Correct_Password){
        const Token = jwt.sign({UserID:User._id},"UserToken");
        res.status(200).send({"Message":"Login Successful","User":User,"Token":Token});
    }
    else{
        res.status(400).send({"Message":"Invalid Credentials"})
    }
});

module.exports = {
    authenticationRouter
}