import mongoose, { Schema } from "mongoose";

const planSchema = new Schema(
    {
        destination: {
            type: String,
            required: true,
        },
        traveller: {
            type: Number,
            required: true,
            min: 1,
        },
        budget: {
            type: Number,
            min: 0,
        },
        description: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
