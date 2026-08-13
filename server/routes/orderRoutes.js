import express from "express";

import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder)

router.get("/myorders", protect, getMyOrders)

router.get("/", protect, admin, getAllOrders);

router.get("/:id", protect, admin, getOrderDetails);

router.put("/:id", protect, admin, updateOrderStatus);

export default router;