import express from 'express';
import { getRoom, addRoom, deleteRoom, roomList, editRoom, updateRoom } from '../controllers/Room.js';

const router = express.Router();

router.get("/", getRoom);
router.post("/add", addRoom);
router.delete("/delete/:id", deleteRoom);
router.get("/list", roomList);
router.get("/edit/:id", editRoom);
router.patch("/update/:id", updateRoom);

export default router;