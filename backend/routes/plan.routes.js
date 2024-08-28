import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    createPlan,
    deletePlan,
    getAllUserPlans,
    getPlan,
} from "../controllers/plan.controller.js";

const router = express.Router();

router.get("/user/:email", protectRoute, getAllUserPlans);
router.get("/:id", protectRoute, getPlan);
router.post("/create", protectRoute, createPlan);
router.delete("/:id", protectRoute, deletePlan);

export default router;
