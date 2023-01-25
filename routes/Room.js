import express  from "express";
import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin, verifyUser } from "../utils/VerifyToken.js"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/Rooms.js";

const router =express.Router();

router.post("/:hotelid", verifyAdmin, createRoom )
router.get("/", getRooms)
router.get("/:id", getRoom )
router.put("/:id", verifyAdmin, updateRoom)
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)


export default router