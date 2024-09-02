import React, { useState } from "react";
import api from "../../../config/axiosConfig";

const SalesReport = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [period, setPeriod] = useState("");
	const [format, setFormat] = useState("pdf");
	const [reportData, setReportData] = useState(null);

	const handleFetchData = async (
		selectedPeriod = "",
		customStart = "",
		customEnd = ""
	) => {
		try {
			const response = await api.get("/report/generate-report", {
				params: {
					startDate: customStart || undefined,
					endDate: customEnd || undefined,
					period: selectedPeriod || undefined,
				},
			});
			setReportData(response.data.report);
		} catch (error) {
			console.error("Error fetching the report:", error);
		}
	};

	const handleDownloadReport = async () => {
		try {
			const response = await api.get("/report/download-report", {
				params: { startDate, endDate, period, format },
				responseType: "blob",
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `sales_report.${format}`);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error downloading the report:", error);
		}
	};

	const renderReportTable = () => {
		if (!reportData) return <p>No data available</p>;

		return (
			<table className="min-w-full table-auto">
				<thead>
					<tr>
						<th className="px-4 py-2">Order ID</th>
						<th className="px-4 py-2">Order Amount</th>
						<th className="px-4 py-2">Discount</th>
						<th className="px-4 py-2">Date</th>
					</tr>
				</thead>
				<tbody>
					{reportData.orders.map((order) => (
						<tr key={order._id}>
							<td className="border px-4 py-2">{order._id}</td>
							<td className="border px-4 py-2">{order.theTotelAmount}</td>
							<td className="border px-4 py-2">{order.discount}</td>
							<td className="border px-4 py-2">
								{new Date(order.createdAt).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Generate Sales Report</h2>

			<div className="mb-4">
				<button
					onClick={() => {
						setPeriod("day");
						handleFetchData("day");
					}}
					className="bg-black text-white py-2 px-4 rounded mr-2"
				>
					Today
				</button>
				<button
					onClick={() => {
						setPeriod("week");
						handleFetchData("week");
					}}
					className="bg-black text-white py-2 px-4 rounded mr-2"
				>
					This Week
				</button>
				<button
					onClick={() => {
						setPeriod("month");
						handleFetchData("month");
					}}
					className="bg-black text-white py-2 px-4 rounded mr-2"
				>
					This Month
				</button>
			</div>

			<div className="mb-4">
				<label className="block mb-2">Start Date:</label>
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					className="border p-2 rounded w-full"
				/>
				<label className="block mb-2">End Date:</label>
				<input
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					className="border p-2 rounded w-full"
				/>
				<button
					onClick={() => {
						setPeriod("");
						handleFetchData("", startDate, endDate);
					}}
					className="bg-black text-white py-2 px-4 rounded mt-2"
				>
					Fetch Custom Date Range
				</button>
			</div>

			<div className="mb-4">{renderReportTable()}</div>

			<div className="mb-4">
				<label className="block mb-2">Format:</label>
				<select
					value={format}
					onChange={(e) => setFormat(e.target.value)}
					className="border p-2 rounded w-full"
				>
					<option value="pdf">PDF</option>
					<option value="xlsx">Excel</option>
				</select>
			</div>

			<button
				onClick={handleDownloadReport}
				className="bg-black text-white py-2 px-4 rounded"
			>
				Download Report
			</button>
		</div>
	);
};

export default SalesReport;
