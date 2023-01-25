import express  from "express";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom= async (req,res,next)=>{
    const newRoom = new Room(req.body)
    const hotelId = req.params.hotelid
    try{
      
const savedRoom = await newRoom.save();
try{
  await Hotel.findByIdAndUpdate(hotelId, 
    {$push:{rooms:savedRoom._id}}); 

}
catch(err){
next(err)
}
res.status(200).json(savedRoom)
    }
    catch(err){
next(err)
    }
}

export const getRooms = async (req,res,next)=>{
    try{
        const getRoooms = await Room.find()
        res.status(200).json(getRoooms)
    
    }catch(err){
        next(err)
    } 
    }
    export const getRoom = async (req,res,next)=>{
        try{
            const id = req.params.id
            const getRoom = await Room.findById(id)
            res.status(200).json(getRoom)
        }
        catch(err){
            next(err)
        }    
    }
    export const updateRoom = async (req,res,next)=>{
        try{
            const id = req.params.id
            const updateRoom = await Room.findByIdAndUpdate(id, {$set:req.body}, {new: true})
            res.status(200).json(updateRoom)
        }
        catch(err){
            next(err)
        }
       
    }
    export const deleteRoom = async (req,res,next)=>{
        const hotelId = req.params.hotelid
        const id = req.params.id
        try{
           await Room.findByIdAndDelete(id)     
        try
        {       
         await Hotel.findByIdAndUpdate(hotelId,{$pull :{rooms:id}})
        }
        catch(err){
            next(err)
        }
        res.status(200).json("Room deleted Successfully")
    }
        catch(err){
            next(err)
        } 
    }
    