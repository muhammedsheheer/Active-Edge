import moment from "moment";
import Order from "../model/orderSchema.js";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getSalesReport = async (startDate, endDate, period) => {
	let start, end;

	if (period === "day") {
		start = moment().startOf("day");
		end = moment().endOf("day");
	} else if (period === "week") {
		start = moment().startOf("week");
		end = moment().endOf("week");
	} else if (period === "month") {
		start = moment().startOf("month");
		end = moment().endOf("month");
	} else if (startDate && endDate) {
		start = moment(startDate).startOf("day");
		end = moment(endDate).endOf("day");
	} else {
		throw new Error("Invalid date range");
	}

	const orders = await Order.find({
		createdAt: { $gte: start.toDate(), $lte: end.toDate() },
	});

	const overallSalesCount = orders.length;
	const overallOrderAmount = orders.reduce(
		(acc, order) => acc + order.theTotelAmount,
		0
	);
	const overallDiscount = orders.reduce(
		(acc, order) => acc + order.discount,
		0
	);
	// const totalCouponsDeduction = orders.reduce(
	// 	(acc, order) => acc + order.couponsDeduction,
	// 	0
	// );

	return {
		overallSalesCount,
		overallOrderAmount,
		overallDiscount,
		// totalCouponsDeduction,
		orders,
	};
};

const generateReport = async (req, res) => {
	try {
		const { startDate, endDate, period } = req.query;

		const reportData = await getSalesReport(startDate, endDate, period);

		res.status(200).json({
			message: "Order fetched successfully",
			report: reportData,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// const downloadReport = async (req, res) => {
// 	try {
// 		const { format, startDate, endDate, period } = req.query;
// 		const reportData = await getSalesReport(startDate, endDate, period);

// 		if (format === "xlsx") {
// 			const workbook = new ExcelJS.Workbook();
// 			const worksheet = workbook.addWorksheet("Sales Report");

// 			worksheet.columns = [
// 				{ header: "Sales Count", key: "overallSalesCount", width: 15 },
// 				{ header: "Order Amount", key: "overallOrderAmount", width: 20 },
// 				{ header: "Discount", key: "overallDiscount", width: 15 },
// 				// {
// 				// 	header: "Coupons Deduction",
// 				// 	key: "totalCouponsDeduction",
// 				// 	width: 20,
// 				// },
// 			];

// 			worksheet.addRow({
// 				overallSalesCount: reportData.overallSalesCount,
// 				overallOrderAmount: reportData.overallOrderAmount,
// 				overallDiscount: reportData.overallDiscount,
// 				// totalCouponsDeduction: reportData.totalCouponsDeduction,
// 			});

// 			res.setHeader(
// 				"Content-Type",
// 				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
// 			);
// 			res.setHeader(
// 				"Content-Disposition",
// 				"attachment; filename=sales_report.xlsx"
// 			);

// 			await workbook.xlsx.write(res);
// 			res.end();
// 		} else if (format === "pdf") {
// 			const doc = new PDFDocument();
// 			const filePath = path.join(__dirname, "sales_report.pdf");
// 			doc.pipe(fs.createWriteStream(filePath));

// 			doc.fontSize(20).text("Sales Report", { align: "center" });

// 			doc.fontSize(12).text(`Sales Count: ${reportData.overallSalesCount}`, {
// 				align: "left",
// 			});
// 			doc.fontSize(12).text(`Order Amount: ${reportData.overallOrderAmount}`, {
// 				align: "left",
// 			});
// 			doc
// 				.fontSize(12)
// 				.text(`Discount: ${reportData.overallDiscount}`, { align: "left" });
// 			// doc
// 			// 	.fontSize(12)
// 			// 	.text(`Coupons Deduction: ${reportData.totalCouponsDeduction}`, {
// 			// 		align: "left",
// 			// 	});

// 			doc.end();

// 			doc.on("finish", () => {
// 				res.download(filePath, "sales_report.pdf", (err) => {
// 					if (err) {
// 						console.error("Error downloading PDF:", err);
// 					}
// 					fs.unlinkSync(filePath);
// 				});
// 			});
// 		} else {
// 			res.status(400).send("Invalid format");
// 		}
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}
// };

const downloadReport = async (req, res) => {
	try {
		const { format, startDate, endDate, period } = req.query;
		const reportData = await getSalesReport(startDate, endDate, period);

		if (format === "xlsx") {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Sales Report");

			worksheet.columns = [
				{ header: "Order ID", key: "_id", width: 30 },
				{ header: "Date", key: "createdAt", width: 20 },
				{ header: "Total Amount", key: "theTotelAmount", width: 15 },
				{ header: "Discount", key: "discount", width: 15 },
			];

			reportData.orders.forEach((order) => {
				worksheet.addRow({
					_id: order._id,
					createdAt: moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss"),
					theTotelAmount: order.theTotelAmount,
					discount: order.discount,
				});
			});

			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			);
			res.setHeader(
				"Content-Disposition",
				"attachment; filename=sales_report.xlsx"
			);

			await workbook.xlsx.write(res);
			res.end();
		} else if (format === "pdf") {
			const doc = new PDFDocument({ margin: 40, size: "A4" });

			res.setHeader("Content-Type", "application/pdf");
			res.setHeader(
				"Content-Disposition",
				"attachment; filename=sales_report.pdf"
			);

			doc.pipe(res);

			// Title
			doc
				.fontSize(20)
				.text("Sales Report", { align: "center", underline: true });
			doc.moveDown(2);

			// Summary
			doc.fontSize(12).text(`Sales Count: ${reportData.overallSalesCount}`);
			doc.fontSize(12).text(`Order Amount: ${reportData.overallOrderAmount}`);
			doc.fontSize(12).text(`Discount: ${reportData.overallDiscount}`);
			doc.moveDown(1.5);

			// Table Header with Background
			const tableTop = doc.y;
			const columnWidth = 140; // Adjusted for more space in Date column
			const rowHeight = 20;
			const headerBgColor = "#f2f2f2";

			// Background for headers
			doc.rect(30, tableTop, 520, rowHeight).fill(headerBgColor).stroke();

			doc
				.fillColor("black")
				.fontSize(12)
				.text("Order ID", 35, tableTop + 5, { width: 120, align: "left" }); // Adjusted width
			doc.text("Date", 165, tableTop + 5, {
				width: columnWidth,
				align: "left",
			}); // Increased width for more space
			doc.text("Total Amount", 325, tableTop + 5, {
				width: 110,
				align: "right",
			});
			doc.text("Discount", 455, tableTop + 5, { width: 90, align: "right" });
			doc.moveDown(1);

			// Horizontal line to separate header from data
			doc.moveTo(30, doc.y).lineTo(550, doc.y).stroke();
			doc.moveDown(0.5);

			// Table Rows with Borders
			reportData.orders.forEach((order, index) => {
				const y = doc.y;
				const rowColor = index % 2 === 0 ? "#f9f9f9" : "#ffffff"; // alternating row colors
				doc.rect(30, y, 520, rowHeight).fill(rowColor).stroke();
				doc.fillColor("black");

				doc
					.fontSize(10)
					.text(order._id, 35, y + 5, { width: 120, align: "left" });
				doc.text(
					moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss"),
					165,
					y + 5,
					{ width: columnWidth, align: "left" }
				); // Adjusted for more space
				doc.text(order.theTotelAmount.toFixed(2), 325, y + 5, {
					width: 110,
					align: "right",
				});
				doc.text(order.discount.toFixed(2), 455, y + 5, {
					width: 90,
					align: "right",
				});
				doc.moveDown(1);
			});

			doc.end();
		} else {
			res.status(400).send("Invalid format");
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export { generateReport, downloadReport };
