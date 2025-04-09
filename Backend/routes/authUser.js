const express= require("express");

const { userRegister, userLogin, userLogout } = require("../routeController/userrouteController"); 
const router=express.Router();

router.post("/register",userRegister);

router.post("/login",userLogin);

router.post("/logout",userLogout);


module.exports=router;