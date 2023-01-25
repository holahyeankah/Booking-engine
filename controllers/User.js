import { createError } from "../utils/Error.js";
import User from "../models/User.js";

export const getUsers =async(req,res,next) =>{
        try{
            const getUsers = await User.find()
            res.status(200).json(getUsers)
        }
        catch(err){
            next(err)
        }
}
export const getUser = async(req,res,next)=>{
        try{
            const id= req.params.id
            const getUser = await User.findById(id)
            res.status(200).json(getUser)
        }
        catch(err){
            next(err)
        }
}

export const updateUser = async(req,res,next)=>{
    try{
        const id= req.params.id
        const updateUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        const{password, ...otherDetails} = updateUser._doc;
        res.status(200).json({...otherDetails})
    }
    catch(err){
        next(err)
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        const id= req.params.id
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json(`User with id:${id} is deleted`)
    }
    catch(err){
        next(err)
    }
}