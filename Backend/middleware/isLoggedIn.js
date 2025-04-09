const jwt=require("jsonwebtoken");
const  userModel =require("../Model/userModel");

const isLoggedIn=async(req,res,next)=>{
    try{
        const Token=req.cookies.token ||  req.header("Authorization")?.split(" ")[1];;
        console.log(Token);
        if(!Token) return res.status(500).send({success:false,message:"User Unauthorize"});
        const decode=jwt.verify(Token,process.env.SECRET);
        if(!decode) return res.status(500).send({success:false,message:"User Unauthorize - Invalid token"});
         req.user=await userModel.findById(decode.userid).select("-password");
        if(! req.user) return res.status(500).send({success:false,message:"User not found"});
        next();

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:error
        })
        console.log(error);

    }
}

module.exports=isLoggedIn;