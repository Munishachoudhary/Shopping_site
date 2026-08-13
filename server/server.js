import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.use("/api/products",productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/users",userRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});

import { sendEmail } from './utils/sendEmail.js';

app.get('/test-email', async (req, res) => {
  try {
    await sendEmail(
      'munishachoudhary15@gmail.com',
      'Test Email',
      '<h2>Email is working successfully!</h2>'
    );

    res.send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});