import express from "express";

import {
  getUsers,
  getUserById,
  deleteUser,
  toggleAdmin,
} from "../controllers/userController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);

router.get("/:id", protect, admin, getUserById);

router.delete("/:id", protect, admin, deleteUser);

router.put("/admin/:id", protect, admin, toggleAdmin);

export default router;