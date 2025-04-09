const express =require("express");
const dotenv=require("dotenv");
const dbconnect =require("./DB/dbconnect");
const  authUser =require ("../Backend/routes/authUser");
const  messageRoute =require( "../Backend/routes/messageRoute");
const authRoute=require("./routes/authRoute");
const  cookieParser=require("cookie-parser");
const {app,io,server}=require("./socket/socket");
const path=require("path");


dotenv.config();

// const __dirname=path.resolve();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"../frontend/dist")));


app.use("/api/auth",authUser);
app.use("/api/mess",messageRoute);
app.use("/api/user",authRoute);


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
});

const PORT=process.env.Port || 4000;
server.listen(PORT,()=>{
    dbconnect();
    console.log("working at 4000");
})
