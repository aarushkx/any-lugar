import { asyncHandler } from "../utils/handlers/asyncHandler.js";
import { hashString } from "../utils/hash/hashString.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUserProfile = asyncHandler(async (req, res) => {
    const { email } = req.params;

    if (req.user.email !== email)
        res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ email }).select("name email");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, currentPassword, newPassword } = req.body;

    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }
    }

    if ((!newPassword && currentPassword) || (!currentPassword && newPassword))
        return res.status(400).json({
            error: "Please provide both current and new password",
        });

    if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch)
            return res
                .status(400)
                .json({ error: "Current password is incorrect" });
        if (newPassword.length < 8)
            return res.status(400).json({
                error: "Password must be at least 8 characters long",
            });

        user.password = await hashString(newPassword);
    }

    user.name = name || user.name;
    user.email = email || user.email;

    user = await user.save();
    user.password = null;

    return res.status(200).json(user);
});
