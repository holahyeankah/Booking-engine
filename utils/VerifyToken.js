import express from "express";
import jwt from "jsonwebtoken";
import { createError } from "./Error.js";




export const verifyToken=(req,res,next)=>{
const token = req.cookies.access
if(!token){
return next(createError(401, "You are not authenticated"))
}

jwt.verify(token, process.env.SecretKey,(err,user)=>{
if(err)
return next(createError(403, "Token is not valid"))
req.user = user
next()
});
};

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            return next(createError(403, "You are not authorized"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403, "You are not authorized"))
        }
    })
}

