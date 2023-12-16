const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
           const {UserID} = decoded;
           req.userID = UserID;
           next(); 
           
        }
        else{
           res.status(401).send({'Message':"Invalid Token, Please Login Again"})
        }
    });

}

module.exports = {
    authenticate
}