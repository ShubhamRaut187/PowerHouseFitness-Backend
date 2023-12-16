const {UserModel} = require('../Models/User.model');
const authorize = async(req,res,next) => {
    const UserID = req.userID;
    const User = await UserModel.findOne({_id:UserID})
    console.log(req.userID)
    if(User.Role === 'Admin'){
        next();
    }
    else{
        res.status(401).send({"Message":"You are not authorized"})
    }
}

module.exports = {
    authorize
}