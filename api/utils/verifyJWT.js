import jwt from "jsonwebtoken"
const verifyJWT=async(req,res,next)=>{
    const token = req.cookies.access_token;
    console.log(token);
    if(!token){
        return res.status(401).json({msg:"Unauthorized"});
    }
    try{
        const decoded=jwt.verify(token,"receiyfoodmernStack12345",(err,user)=>{
            if(err){
                return res.status(401).json({msg:"Unauthorized"});
            }

            req.user=user;
            next();
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal server error"});
    }
}
export default verifyJWT;