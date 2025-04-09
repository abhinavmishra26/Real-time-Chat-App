const { conversationModel } = require("../Model/conversationModel");
const userModel=require("../Model/userModel");
const getUserBySearch=async(req,res)=>{
    try{
      const search=req.query.search || "";
      const currentUserId=req.user._id;
      const user=await userModel.find({
        $and:[
            {
                $or:[
                    {username:{$regex:".*"+search+".*",$options:"i"}},
                    {fullname:{$regex:".*"+search+".*",$options:"i"}}
                ]
            },{
                _id:{$ne:currentUserId}
            }
        ]
      }).select("-password").select("-email");
      res.status(200).send(user);
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:error,
        })
        console.log(error);
    }
}



const getCurrentChatters = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const conversations = await conversationModel.find({
      participants: currentUserId,
    })
      .populate({
        path: "participants",
        select: "-password -email", // exclude sensitive data
        match: { _id: { $ne: currentUserId } }, // exclude the current user from participants
      })
      .select("-messages") // optional: exclude messages if you only want participants
      .sort({ updatedAt: -1 }); // optional: sort by latest conversation

    // Filter out any conversations where the other participant got filtered out (just in case)
    const chatters = conversations
      .map(convo => convo.participants.find(p => p))
      .filter(Boolean);

    res.status(200).send(chatters);

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch current chatters",
    })
  }
}

module.exports={getUserBySearch , getCurrentChatters};