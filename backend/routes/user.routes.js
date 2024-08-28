import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    getUserProfile,
    updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:email", protectRoute, getUserProfile);
router.post("/update", protectRoute, updateUserProfile);

export default router;
