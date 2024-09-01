import {
	acceptReturn,
	cancelOrder,
	createOrder,
	getAllOrderData,
	getOrderData,
	getOrderDetailsById,
	getReturnDetails,
	rejectReturn,
	returnOrderRequest,
	updateProductStatus,
} from "../controller/orderCntroller.js";
import express from "express";
import { isAuth, isAuthAdmin } from "../midlware/isAuth.js";

const router = express.Router();

router.post("/create-order", isAuth, createOrder);
router.get("/get-orders", isAuth, getOrderData);
router.get("/get-order-data", isAuth, isAuthAdmin, getAllOrderData);
router.get("/get-order-details/:id", isAuth, isAuthAdmin, getOrderDetailsById);
router.put("/update-product-status/:id", isAuth, updateProductStatus);
router.put("/user-order-status-change", isAuth, cancelOrder);
router.post("/return-order-request", isAuth, returnOrderRequest);
router.get("/get-return-details", isAuth, getReturnDetails);
router.put("/accept-return", isAuth, acceptReturn);
router.put("/reject-return", isAuth, rejectReturn);
export default router;
