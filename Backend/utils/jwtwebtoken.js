const jwt=require("jsonwebtoken");
const jwttoken=(userid,res)=>{
   const token=jwt.sign({userid},process.env.SECRET);
    res.cookie('token',token,{
        maxAge:30*24*60*3000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.SECURE !=='development'
    })

}

module.exports=jwttoken;