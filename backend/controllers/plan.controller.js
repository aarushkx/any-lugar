import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import Plan from "../models/plan.model.js";
import User from "../models/user.model.js";

export const createPlan = asyncHandler(async (req, res) => {
    const { destination, traveller, budget, description } = req.body;
    const userId = req.user._id;

    if (!destination || destination.trim() === "")
        return res.status(400).json({ error: "Destination is required" });

    if (destination.length > 100) return res.status(400).json({
        error: "Destination cannot be more than 100 characters long",
    });

    if (!traveller || traveller <= 0 || traveller > 100000)
        return res
            .status(400)
            .json({ error: "Number of travellers is invalid" });

    if (!budget || budget <= 0 || budget > 100000000)
        return res.status(400).json({ error: "Budget is invalid" });

    if (description.length > 1000) return res.status(400).json({
        error: "Description cannot be more than 1000 characters long",
    });

    const newPlan = new Plan({
        destination,
        traveller,
        budget,
        description,
        userId,
    });

    const savedPlan = await newPlan.save();
    await User.findByIdAndUpdate(userId, { $push: { plans: savedPlan._id } });

    res.status(201).json(savedPlan);
});

export const deletePlan = asyncHandler(async (req, res) => {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    if (plan.userId.toString() !== req.user._id.toString()) {
        return res
            .status(401)
            .json({ error: "You are not authorized to delete this plan" });
    }

    await Plan.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user._id, {
        $pull: { plans: req.params.id },
    });

    res.status(200).json({ message: "Plan deleted successfully" });
});

export const getAllUserPlans = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const email = req.params.email;

    if (req.user.email !== email)
        res.status(401).json({ error: "Unauthorized" });

    const plans = await Plan.find({ userId }).sort({ createdAt: -1 });

    if (plans.length === 0) return res.status(200).json([]);

    res.status(200).json(plans);
});

export const getPlan = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) return res.status(404).json({ error: "Plan not found" });

    res.status(200).json(plan);
});
