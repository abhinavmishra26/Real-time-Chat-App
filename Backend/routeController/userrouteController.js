const bcrypt=require("bcrypt");
const  userModel= require( "../Model/userModel");
const jwttoken =require( "../utils/jwtwebtoken");

 const userRegister= async (req,res)=>{
     try{
        const {fullname ,username, email,password,profilepic,gender}=req.body;

        let existinguser = await userModel.findOne({
          $or: [{ username: username }, { email: email }]
        });
        if(existinguser){
           return res.status(500).json({message:"Username or email already exists" ,result:"false"});
        }
       const  profileBoy=  `https://avatar.iran.liara.run/public/boy?username=${username}`;
       const  profileGirl=  `https://avatar.iran.liara.run/public/girl?username=${username}`;
       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(password, salt);
           let user= await userModel.create({
            fullname,
            username,
            email,
            password:hash,
            gender,
            profilepic:(gender==="male")? profileBoy:profileGirl,
            });
            if(user){
              res.status(201).send({
                  _id:user._id,
                  fullname:user.fullname,
                  username:user.username,
                  email:user.email,
                  profilepic:user.profilepic,
                  gender:user.gender,
                  message:"successfully registered",
                  result:"true",
                });
            }
            else{
              res.status(500).json({message:"Invalid user data"});
            }
     }
     catch(error){
        res.status(500).send({
          success:false,
          message:error.message,
        });
        console.log(error);
     }
}



const userLogin=async (req,res)=>{
 try{
  const {email,password}=req.body;
  let user=await userModel.findOne({email});
  
  if(user===null){
    return res.status(404).send({success:false,message:"Email Doesn't Exist ...Register Please"});
  }
  const comparepassword=  bcrypt.compareSync(password,user.password || "");
  if(!comparepassword) return res.status(401).send({success:false,message:"Email or Password doesn't Matching"})
    jwttoken(user._id ,res);
  res.status(200).send({
    success: true,
    _id:user._id,
    fullname:user.fullname,
    username:user.username,
    email:user.email,
    gender:user.gender,
    profilepic:user.profilepic,
    message:"Login successfully"
  });
 }
 catch(error){
  res.status(500).send({
    success:false,
    message:error.message,
  })
 }
}


 const userLogout=(req,res)=>{
  try{
    res.cookie("token","",{
      maxAge:0
    })

    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: false,  // Change to `false` if testing on localhost without HTTPS
    //   sameSite: "none",
    // });
    res.status(200).send({ success :true , message:"logout successfully"});

  }
  catch(error){
    res.status(500).send({
      success:false,
      message:error,
    })
    console.log(error);
  }
}

module.exports = { userRegister, userLogin, userLogout }