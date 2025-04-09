const mongoose=require("mongoose");

 const dbconnect=async()=>{
    try{
       await mongoose.connect(process.env.MONGODB_CONNECT),
       console.log("Database connect successfully");
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports=dbconnect;
