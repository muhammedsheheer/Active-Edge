import express from "express";
import {
	downloadReport,
	generateReport,
} from "../controller/salesReportController.js";
const router = express.Router();

router.get("/generate-report", generateReport);
router.get("/download-report", downloadReport);

export default router;
