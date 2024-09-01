import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import ConfirmationReturnModal from "../../../components/user/ConfirmationRetunmodal";
import Pagination from "../../../components/common/Pagination";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";

const Return = () => {
	const [getReturnData, setGetReturnData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [acceptModal, setAcceptModal] = useState(false);
	const [rejectModal, setRejectModal] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const returnPerPage = 7;

	const fetchReturns = async () => {
		try {
			const response = await api.get("/order/get-return-details");
			console.log("API Response:", response);
			setGetReturnData(response.data.returnRequest);
		} catch (error) {
			console.error("Error fetching orders:", error.message);
			setError("Failed to load order data.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReturns();
	}, []);

	const handleOpenAcceptModal = (returnId) => {
		setSelectedId(returnId);
		setAcceptModal(true);
	};

	const handleCloseAcceptModal = () => {
		setSelectedId(null);
		setAcceptModal(false);
	};

	const handleOpenRejectModal = (returnId) => {
		setSelectedId(returnId);
		setRejectModal(true);
	};

	const handleCloseRejectModal = () => {
		setSelectedId(null);
		setRejectModal(false);
	};

	const handleAccept = async () => {
		try {
			if (selectedId) {
				await api.put("/order/accept-return", { returnId: selectedId });
				fetchReturns();
				setAcceptModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleReject = async () => {
		try {
			if (selectedId) {
				await api.put("/order/reject-return", { returnId: selectedId });
				fetchReturns();
				setRejectModal(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const indexOfLastReturn = currentPage * returnPerPage;
	const indexOfFirstReturn = indexOfLastReturn - returnPerPage;
	const currentReturns = getReturnData.slice(
		indexOfFirstReturn,
		indexOfLastReturn
	);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "ProductName", field: "productName" },
		{ label: "Reason", field: "reason" },
		{ label: "Status", field: "status" },
		{ label: "Return Date", field: "date" },
		{ label: "Action", field: "action" },
	];

	const returnData = currentReturns.map((returnItem, index) => ({
		serialNo: indexOfFirstReturn + index + 1,
		productName: returnItem?.productId?.productName,
		reason: returnItem?.reason,
		status: returnItem?.status,
		status: (
			<div
				className={`text-center rounded-md py-1 px-2 font-semibold ${
					returnItem?.status === "Pending"
						? "bg-yellow-100 text-yellow-500"
						: returnItem?.status === "Accepted"
						? "bg-green-100 text-green-500"
						: returnItem?.status === "Rejected"
						? "bg-gray-100 text-gray-500"
						: "bg-red-100 text-red-600"
				}`}
			>
				{returnItem?.status}
			</div>
		),
		date: new Date(returnItem?.returnDate).toLocaleDateString(),
		action: (
			<div className="flex space-x-2">
				<button
					onClick={() => handleOpenAcceptModal(returnItem._id)}
					className={`py-1 px-2 font-semibold rounded ${
						returnItem?.status == "Accepted"
							? "bg-green-300 text-green-700 cursor-not-allowed"
							: "bg-green-500 text-white hover:bg-green-600"
					}`}
					disabled={returnItem?.status === "Accepted"}
				>
					Accepte
				</button>
				<button
					onClick={() => handleOpenRejectModal(returnItem._id)}
					className={`py-1 px-2 font-semibold rounded ${
						returnItem?.status == "Accepted"
							? "bg-red-300 text-red-700 cursor-not-allowed"
							: "bg-red-500 text-white hover:bg-red-600"
					}`}
					disabled={returnItem?.status == "Accepted"}
				>
					Rejecte
				</button>
			</div>
		),
	}));
	return (
		<>
			<ReusableTable columns={columns} data={returnData} />
			<BreadCrumbWithButton />
			<ConfirmationReturnModal
				open={acceptModal}
				onClose={handleCloseAcceptModal}
				onConfirm={handleAccept}
				message={"Are you sure you want to accept this return?"}
			/>
			<ConfirmationReturnModal
				open={rejectModal}
				onClose={handleCloseRejectModal}
				onConfirm={handleReject}
				message={"Are you sure you want to reject this return?"}
			/>

			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(getReturnData.length / returnPerPage)}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</>
	);
};

export default Return;
