import express from "express";
import { isAuth, isAuthAdmin } from "../midlware/isAuth.js";
import { createBrand, getBrands } from "../controller/brandController.js";

const router = express.Router();

router.post("/createBrand", isAuth, isAuthAdmin, createBrand);
router.get("/getbrands", isAuth, isAuthAdmin, getBrands);

export default router;
