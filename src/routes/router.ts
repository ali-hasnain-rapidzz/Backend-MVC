import express from 'express';
import authRoutes from "@Routes/auth.route";
import userRoutes from "@Routes/user.route"

const router = express.Router();

// routes
router.use("/auth", authRoutes);
router.use("/user",userRoutes);


export default router;
