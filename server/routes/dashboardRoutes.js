import express from "express";
import { dashboardStats } from "../controllers/dashboardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, dashboardStats);

export default router;