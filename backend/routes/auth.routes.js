import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    register,
    login,
    logout,
    getUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/current-user", protectRoute, getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
