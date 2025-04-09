const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,

    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    profilepic:{
        type:String,
        required: true,
        default:"",
    }
})


const User=mongoose.model("User",userSchema);

module.exports=User;