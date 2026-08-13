import express from "express";

import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
    addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


router.get("/:id/reviews", getReviews);

router.post("/:id/reviews", addReview);

router.put(
  "/:id/reviews/:reviewId",
  updateReview
);

router.delete(
  "/:id/reviews/:reviewId",
  deleteReview
);
export default router;