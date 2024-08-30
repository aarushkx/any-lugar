import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import { generateTokenAndSetCookie } from "../utils/tokens/token.js";
import { hashString } from "../utils/hash/hashString.js";

export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === ""))
        return res.status(400).json({
            error: "All fields are required",
        });

    if (name.length > 50)
        return res.status(400).json({
            error: "Name cannot exceed 50 characters",
        });

    if (email.length > 100)
        return res.status(400).json({
            error: "Email cannot exceed 100 characters",
        });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Invalid email address",
        });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({
            error: "Email is already in use",
        });
    }

    if (password.length < 8) {
        return res
            .status(400)
            .json({ error: "Password must be at least 8 characters long" });
    }

    const createdUser = new User({
        name,
        email,
        password: await hashString(password),
    });

    if (createdUser) {
        generateTokenAndSetCookie(res, createdUser._id);
        await createdUser.save();

        return res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            plans: createdUser.plans,
        });
    } else {
        return res.status(400).json({
            error: "Invalid user data",
        });
    }
});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({
            error: "All fields are required",
        });
    }

    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
        return res.status(400).json({
            error: "Invalid email or password",
        });
    }

    generateTokenAndSetCookie(res, user._id);
    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        plans: user.plans,
    });
});

export const logout = asyncHandler(async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
        message: "Logged out successfully",
    });
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
});
