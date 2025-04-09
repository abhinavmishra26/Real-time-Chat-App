const express=require("express");
const {sendMessage ,getMessages} = require("../routeController/messagerouteController");
const isLoggedIn=require("../middleware/isLoggedIn");
const router=express.Router();

router.post("/send/:id",isLoggedIn,sendMessage);
router.get("/:id",isLoggedIn,getMessages);


module.exports=router;