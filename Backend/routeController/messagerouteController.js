const  {conversationModel} = require("../Model/conversationModel");
const {messageModel}=require("../Model/messageModel");
const { getReceiverSocketId ,io} = require("../socket/socket");

 const sendMessage=async (req,res)=>{
    try{
       const {message}=req.body;
       const {id:receiverId}=req.params;
       const senderId = req.user ? req.user._id : null;
       let chats=await conversationModel.findOne({
        participants:{$all:[senderId,receiverId]}
       })
       if(!chats){
        chats=await conversationModel.create({
            participants:[senderId,receiverId]
        })
       }
       const newMessages=new messageModel({
        senderId,
        receiverId,
        message,
        conversationId:chats._id
       })
       if(newMessages){
        chats.messages.push(newMessages._id);
       }

       

       await Promise.all([chats.save(),newMessages.save()]);

       const receiverSocketId=getReceiverSocketId(receiverId);
       if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessages",newMessages)
       }

       res.status(201).send(newMessages)
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:error.message
        })
        console.log(error.message);
        

    }
}

 const getMessages=async(req,res)=>{
    try{
        const{id:reciverId}=req.params;
        const senderId = req.user ? req.user._id : null;
       
        const chats=await conversationModel.findOne({
            participants:{$all:[senderId,reciverId]}
        }).populate("messages")
        if(!chats) return res.status(200).send([]);
        const message=chats.messages;
        res.status(200).send(message);

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:error
        })

    }
}

module.exports={sendMessage ,getMessages};