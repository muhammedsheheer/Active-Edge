import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaShippingFast } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import api from "../../../config/axiosConfig";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Dashboard = () => {
	const [reportData, setReportData] = useState(null);
	const [salesData, setSalesData] = useState([]);
	const [labels, setLabels] = useState([]);
	const [selectedPeriod, setSelectedPeriod] = useState("week");
	const [bestProduct, setBestProduct] = useState([]);

	useEffect(() => {
		handleFetchData(selectedPeriod);
		handleBestSellProduct();
	}, [selectedPeriod]);

	const handleBestSellProduct = async () => {
		try {
			const response = await api.get("/best-selling/top-selling-products");
			console.log(response.data.data);

			setBestProduct(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFetchData = async (period) => {
		try {
			const response = await api.get("/report/generate-dashboard-report", {
				params: {
					period,
				},
			});
			console.log("the ", response?.data?.report);

			const report = response?.data?.report;
			setReportData(report);

			const sales = report?.orders.map((order) => order.totalAmount);
			const newLabels = report?.orders.map((order) => order._id);
			setSalesData(sales);
			setLabels(newLabels);
		} catch (error) {
			console.error("Error fetching the report:", error);
		}
	};

	const handlePeriodChange = (period) => {
		setSelectedPeriod(period);
	};

	const data = {
		labels,
		datasets: [
			{
				label: "Sales",
				data: salesData,
				backgroundColor: "#007bff",
				borderColor: "#0056b3",
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: (context) => `₹ ${context.raw}`,
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: (value) => `₹ ${value}`,
				},
			},
		},
	};

	return (
		<div className="p-8 bg-gray-100 min-h-screen">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="bg-red-600 text-white p-5 rounded-lg flex flex-col items-center">
					<h2 className="text-lg font-semibold">Total Sales</h2>
					<p className="text-3xl font-bold mt-4 flex items-center gap-2">
						<PiMoneyFill size={24} /> ₹{reportData?.overallOrderAmount ?? 0}
					</p>
				</div>
				<div className="bg-green-600 text-white p-5 rounded-lg flex flex-col items-center">
					<h2 className="text-lg font-semibold">Total Orders</h2>
					<p className="text-3xl font-bold mt-4 flex items-center gap-2">
						<FaShippingFast size={24} /> {reportData?.overallSalesCount ?? 0}
					</p>
				</div>
				<div className="bg-purple-600 text-white p-5 rounded-lg flex flex-col items-center">
					<h2 className="text-lg font-semibold">Average Sales</h2>
					<p className="text-3xl font-bold mt-4 flex items-center gap-2">
						<FaShippingFast size={24} /> {reportData?.averageSales ?? 0}
					</p>
				</div>
			</div>
			<div className="flex flex-col md:flex-row gap-8">
				<div className="bg-white p-5 rounded-lg shadow-md flex-1">
					<h2 className="text-lg font-bold mb-4">Sales Report</h2>
					<div className="mb-4">
						<div className="flex space-x-2">
							<button
								className={`py-1 px-3 rounded-lg ${
									selectedPeriod === "week"
										? "bg-black text-white"
										: "bg-gray-200 text-black"
								}`}
								onClick={() => handlePeriodChange("week")}
							>
								Weekly
							</button>
							<button
								className={`py-1 px-3 rounded-lg ${
									selectedPeriod === "month"
										? "bg-black text-white"
										: "bg-gray-200 text-black"
								}`}
								onClick={() => handlePeriodChange("month")}
							>
								Monthly
							</button>
							<button
								className={`py-1 px-3 rounded-lg ${
									selectedPeriod === "year"
										? "bg-black text-white"
										: "bg-gray-200 text-black"
								}`}
								onClick={() => handlePeriodChange("year")}
							>
								Yearly
							</button>
						</div>
					</div>
					<Bar data={data} options={options} />
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md flex-1">
					<h2 className="text-xl font-bold mb-4">Best Selling Products</h2>
					<div className="space-y-4">
						{bestProduct.slice(0, 3).map((product, index) => (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center">
									<img
										className="w-16 h-16 object-cover rounded"
										src={product?._id?.thumbnail}
										alt={product?._id?.productName}
									/>
									<span className="ml-4">{product?._id?.productName}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
