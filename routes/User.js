import express  from "express"
import {deleteUser, getUsers, getUser, updateUser } from "../controllers/User.js";


const router =express.Router()
 router.get("/", getUsers)
 router.get("/:id", getUser)
 router.put("/:id", updateUser)
 router.delete("/:id",deleteUser)

export default router