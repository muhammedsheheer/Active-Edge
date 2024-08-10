import express from "express";
import userRoute from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import brandRoutes from "./brandRoutes.js";
import productRoutes from "./productRoutes.js";
import wishListRoutes from "./wishListRoutes.js";

const app = express.Router();

app.use("/users", userRoute);
app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);
app.use("/wishlist", wishListRoutes);

export default app;
