import authRoutes from "@Routes/auth.route";
import userRoutes from "@Routes/user.route";
import express from "express";

const router = express.Router();

// routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
