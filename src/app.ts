import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import connectDB from "./config/database";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import ratingRoutes from "./routes/ratingRoutes";
import paymentRoutes from "./routes/paymentRoutes";
// import uploadRoutes from "./routes/uploadRoutes";
import { createAdminUser } from "./utils/createAdminUser";
import orderRoutes from "./routes/orderRoutes";
import blogRoutes from "./routes/blogRoutes";
import reelRoutes from "./routes/reelRoutes";
import cartRoutes from "./routes/cartRoutes";
import goldRateRoutes from "./routes/goldRateRoutes";

const app = express();

// createAdminUser();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to E-Commerce API",
    version: "1.0.0",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      ratings: "/api/ratings",
      payments: "/api/payments",
      cart: "/api/cart",
      orders: "/api/orders",
      blogs: "/api/blogs",
      reels: "/api/reels",
      goldRate: "/api/gold-rate",
      // upload: "/api/upload",
    },
  });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/payments", paymentRoutes);
// app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/gold-rate", goldRateRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});
export default app;
