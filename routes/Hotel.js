import express  from "express"
import Hotel from "../models/Hotel.js"
import { countByCity } from "../controllers/Hotel.js"

import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/Hotel.js"
import { verifyAdmin, verifyUser } from "../utils/VerifyToken.js"


const router =express.Router();
router.post("/", verifyAdmin, createHotel)
router.get("/", getAllHotel)
router.get("/find/:id", getHotel )
router.put("/:id",verifyAdmin, updateHotel)
router.delete("/:id",verifyAdmin, deleteHotel)
router.get("/countByCity", countByCity)
// router.get("/countByType", countByType)

export default router