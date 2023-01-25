import { createError } from "../utils/Error.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const createUser =async (req,res,next)=>{
    try{
        const salt =bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const email = req.body.email
        const newUser = new User({
            username:req.body.username,
            email,
            password:hash
        })
        const findUser= await User.findOne({email})
        if(findUser)
        return res.status(409).json("User already exist");
        const savedUser = await newUser.save()
        res.status(201).json(
            {
            message:"User created", 
            savedUser
        })
    }
    catch(err){
        next(err)
    }
}


export const login = async (req,res,next) =>{
    try{
       const email = req.body.email
        const user = await User.findOne({email})
        if(!user)
        return next(createError(404, "Invalid User"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect)
         return next(createError(404, "Wrong Password")) 
     const {password, ...othersDetails} =user._doc
     const token =jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.SecretKey, {expiresIn:"10h"})
     res
     .cookie("access", token,
     {httpOnly:true})
     .status(200)
     .json({...othersDetails})
    } catch(err){
       next(err)
    }
}