import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import authRoute from "./routes/Auth.js"
import userRoute from "./routes/User.js"
import hotelRoute from "./routes/Hotel.js"
import roomRoute from "./routes/Room.js";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken";
mongoose.set("strictQuery", false);

const app = express();
dotenv.config()

const connect = async () =>{
try{
    await mongoose.connect(process.env.MONGO)
    console.log("You are Connected to MongoDb")
}
catch(error){
    throw error;

}
}
mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected from MongoDb")

})
mongoose.connection.on("Connected", ()=>{
    console.log(" Connected from MongoDb")

})

app.use(express.json())
app.use(cookieParser())

app.use("/api/auths", authRoute)
app.use("/api/users", userRoute)
app.use("/api/hotels", hotelRoute)
app.use("/api/rooms", roomRoute)


app.use((err,req,res,next)=>{

    const errMsg = err.message || "Something went wrong";
    const errStatus = err.status || 500 
   return res.status(errStatus)
    .json({
       success:false,
       status:errStatus,
       message:errMsg,
       stack:err.stack
    })
      
   })

const Port = process.env.PORT || 8800


app.listen(Port, err=>{
    connect()
    err ? console.error(err) : console.log(`Server is listening on port ${Port}`)
    
})
