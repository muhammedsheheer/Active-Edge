import express from "express";
import { isAuth, isAuthAdmin } from "../midlware/isAuth.js";
import { createProduct, getProducts } from "../controller/productController.js";

const router = express.Router();

router.post("/createProduct", isAuth, isAuthAdmin, createProduct);
router.get("/getProducts", isAuth, isAuthAdmin, getProducts);

export default router;
