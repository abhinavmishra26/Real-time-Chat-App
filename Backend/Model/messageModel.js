const mongooose=require("mongoose");
const {conversationModel} = require("./conversationModel");

const messageSchema=mongooose.Schema({
    senderId:{
       type:mongooose.Schema.Types.ObjectId,
       ref:"User",
       required:true
    },
    receiverId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    message:{
        type:String,
        required:true
    },
    conversationId:{
        type:mongooose.Schema.Types.ObjectId,
        ref:'Conversation',
        default:[]
    },
},{timestamps:true})

const messageModel=mongooose.model("Message",messageSchema);

module.exports={messageModel};