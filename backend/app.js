import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import planRoutes from "./routes/plan.routes.js";
import aiRoutes from "./routes/ai.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/plans", planRoutes);
app.use("/api/v1/ai", aiRoutes);

export { app };
