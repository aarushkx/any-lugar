import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { generateSuggestions } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/suggestions", protectRoute, generateSuggestions);

export default router;
