const express=require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const {getUserBySearch}=require("../routeController/userhandlerController");
const {getCurrentChatters}=require("../routeController/userhandlerController");
const router=express.Router();

router.get("/search",isLoggedIn,getUserBySearch);
router.get("/currentchatters",isLoggedIn,getCurrentChatters);

module.exports=router;

