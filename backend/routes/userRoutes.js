import express from "express";
import {
	authUser,
	registerUser,
	getUserProfile,
} from "../controllers/userControler.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
