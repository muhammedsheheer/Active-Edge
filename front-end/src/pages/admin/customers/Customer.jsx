// import React, { useEffect, useState } from "react";
// import api from "../../../config/axiosConfig";
// import ReusableTable from "../../../components/admin/ReusableTableData";
// import { RiDeleteBin7Fill } from "react-icons/ri";
// import { MdBlock } from "react-icons/md";
// import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";
// import { useLocation } from "react-router-dom";
// import ConfirmationModal from "../../../components/admin/ConfirmationModal";
// import BlockModal from "../../../components/admin/BlockModal";
// import Pagination from "../../../components/common/Pagination";

// const Customers = () => {
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [itemsPerPage] = useState(1);
// 	const location = useLocation();
// 	const [customers, setCustomers] = useState([]);
// 	const [deletecustomer, setDeleteCustomer] = useState(null);
// 	const [confirmDeletecustomer, setConfirmDeletecustomer] = useState(false);
// 	const [openBlock, setOpenBlock] = useState(false);
// 	const [blocCustomer, setBlockCustomer] = useState(null);
// 	const [blockButtonName, setBlockButtonName] = useState("");

// 	const custemorFetch = async () => {
// 		try {
// 			const response = await api.get("/users/getAllUser");
// 			console.log(response);

// 			setCustomers(response?.data?.users);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	useEffect(() => {
// 		custemorFetch();
// 	}, []);

// 	const columns = [
// 		{ label: "Serial No.", field: "serialNo" },
// 		{ label: "Name", field: "name" },
// 		{ label: "Phone", field: "phone" },
// 		{ label: "Status", field: "status" },
// 		{ label: "Action", field: "action" },
// 	];

// 	const customerData = customers?.map((customer, index) => ({
// 		serialNo: index + 1,
// 		name: (
// 			<div className="flex items-center gap-2">
// 				<img
// 					src={customer?.dpImage}
// 					alt={customer?.name}
// 					className="h-12 w-12 object-contain rounded-xl"
// 				/>
// 				{customer?.name}
// 			</div>
// 		),
// 		phone: customer?.phone,
// 		status: (
// 			<div
// 				className={`text-center rounded-md py-1 px-2 font-semibold ${
// 					customer?.isVerified
// 						? "bg-green-100 text-green-500"
// 						: "bg-red-100 text-red-600"
// 				}`}
// 			>
// 				{customer?.isVerified ? "Active" : "Inactive"}
// 			</div>
// 		),
// 		action: (
// 			<div className="flex space-x-2">
// 				<RiDeleteBin7Fill
// 					className="text-red-500 cursor-pointer text-xl"
// 					onClick={() => handleDeleteCustomer(customer._id)}
// 				/>
// 				<div>
// 					<button
// 						onClick={() => handleBlockCustomerStatus(customer._id)}
// 						className={`py-1 px-2 text-white font-semibold rounded ${
// 							customer?.isVerified ? "bg-green-500" : "bg-red-500"
// 						}`}
// 					>
// 						<MdBlock />
// 					</button>
// 				</div>
// 			</div>
// 		),
// 	}));

// 	const handleBlockCustomerStatus = (customerId) => {
// 		const customer = customers.find((customer) => customer._id === customerId);
// 		setOpenBlock(true);
// 		setBlockCustomer(customerId);
// 		const buttonName = customer?.isVerified ? "Block" : "Unblock";
// 		console.log("Block button name:", buttonName);
// 		setBlockButtonName(buttonName);
// 	};

// 	const confirmBlock = async () => {
// 		try {
// 			const response = await api.put(`/users/blockUser/${blocCustomer}`);
// 			const updatedCustomer = response?.data?.user;
// 			console.log("Updated customer:", updatedCustomer);

// 			setCustomers((prevCustomers) =>
// 				prevCustomers.map((customer) =>
// 					customer._id === blocCustomer
// 						? { ...customer, isVerified: updatedCustomer.isVerified }
// 						: customer
// 				)
// 			);
// 			console.log("Updated customer status:", updatedCustomer.isVerified);
// 			setBlockCustomer(null);
// 			setOpenBlock(false);
// 		} catch (error) {
// 			console.log("Error updating block status:", error);
// 		}
// 	};

// 	const handleDeleteCustomer = (customerId) => {
// 		setDeleteCustomer(customerId);
// 		setConfirmDeletecustomer(true);
// 	};

// 	const confirmDelete = async () => {
// 		try {
// 			await api.delete(`/users/deleteUser/${deletecustomer}`);

// 			custemorFetch();
// 			setDeleteCustomer(null);
// 			setConfirmDeletecustomer(false);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<>
// 			<BreadCrumbWithButton
// 				noButton={false}
// 				location={location.pathname}
// 				componentLocation={"Customers"}
// 			/>
// 			<ReusableTable columns={columns} data={customerData} />
// 			<Pagination
// 				currentPage={currentPage}
// 				totalPages={Math.ceil(customers.length / itemsPerPage)}
// 				onPageChange={(page) => setCurrentPage(page)}
// 			/>
// 			<ConfirmationModal
// 				open={confirmDeletecustomer}
// 				onClose={() => setConfirmDeletecustomer(false)}
// 				message={"Are you sure you want to delete this item"}
// 				onConfirm={confirmDelete}
// 			/>
// 			<BlockModal
// 				open={openBlock}
// 				onClose={() => setOpenBlock(false)}
// 				message={"Are you sure you want to modify user "}
// 				buttonName={blockButtonName}
// 				onConfirm={confirmBlock}
// 			/>
// 		</>
// 	);
// };

// export default Customers;

import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import BreadCrumbWithButton from "../../../components/admin/BreadCrumbWithButton";
import { useLocation } from "react-router-dom";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import BlockModal from "../../../components/admin/BlockModal";
import Pagination from "../../../components/common/Pagination";

const Customers = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(2);
	const location = useLocation();
	const [customers, setCustomers] = useState([]);
	const [deletecustomer, setDeleteCustomer] = useState(null);
	const [confirmDeletecustomer, setConfirmDeletecustomer] = useState(false);
	const [openBlock, setOpenBlock] = useState(false);
	const [blocCustomer, setBlockCustomer] = useState(null);
	const [blockButtonName, setBlockButtonName] = useState("");

	const custemorFetch = async () => {
		try {
			const response = await api.get("/users/getAllUser");
			console.log(response);

			setCustomers(response?.data?.users);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		custemorFetch();
	}, []);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Name", field: "name" },
		{ label: "Phone", field: "phone" },
		{ label: "Status", field: "status" },
		{ label: "Action", field: "action" },
	];

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

	const customerData = currentCustomers?.map((customer, index) => ({
		serialNo: indexOfFirstItem + index + 1,
		name: (
			<div className="flex items-center gap-2">
				<img
					src={customer?.dpImage}
					alt={customer?.name}
					className="h-12 w-12 object-contain rounded-xl"
				/>
				{customer?.name}
			</div>
		),
		phone: customer?.phone,
		status: (
			<div
				className={`text-center rounded-md py-1 px-2 font-semibold ${
					customer?.isVerified
						? "bg-green-100 text-green-500"
						: "bg-red-100 text-red-600"
				}`}
			>
				{customer?.isVerified ? "Active" : "Inactive"}
			</div>
		),
		action: (
			<div className="flex space-x-2">
				<RiDeleteBin7Fill
					className="text-red-500 cursor-pointer text-xl"
					onClick={() => handleDeleteCustomer(customer._id)}
				/>
				<div>
					<button
						onClick={() => handleBlockCustomerStatus(customer._id)}
						className={`py-1 px-2 text-white font-semibold rounded ${
							customer?.isVerified ? "bg-green-500" : "bg-red-500"
						}`}
					>
						<MdBlock />
					</button>
				</div>
			</div>
		),
	}));

	const handleBlockCustomerStatus = (customerId) => {
		const customer = customers.find((customer) => customer._id === customerId);
		setOpenBlock(true);
		setBlockCustomer(customerId);
		const buttonName = customer?.isVerified ? "Block" : "Unblock";
		console.log("Block button name:", buttonName);
		setBlockButtonName(buttonName);
	};

	const confirmBlock = async () => {
		try {
			const response = await api.put(`/users/blockUser/${blocCustomer}`);
			const updatedCustomer = response?.data?.user;
			console.log("Updated customer:", updatedCustomer);

			setCustomers((prevCustomers) =>
				prevCustomers.map((customer) =>
					customer._id === blocCustomer
						? { ...customer, isVerified: updatedCustomer.isVerified }
						: customer
				)
			);
			console.log("Updated customer status:", updatedCustomer.isVerified);
			setBlockCustomer(null);
			setOpenBlock(false);
		} catch (error) {
			console.log("Error updating block status:", error);
		}
	};

	const handleDeleteCustomer = (customerId) => {
		setDeleteCustomer(customerId);
		setConfirmDeletecustomer(true);
	};

	const confirmDelete = async () => {
		try {
			await api.delete(`/users/deleteUser/${deletecustomer}`);

			custemorFetch();
			setDeleteCustomer(null);
			setConfirmDeletecustomer(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<BreadCrumbWithButton
				noButton={false}
				location={location.pathname}
				componentLocation={"Customers"}
			/>
			<ReusableTable columns={columns} data={customerData} />
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(customers.length / itemsPerPage)}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			<ConfirmationModal
				open={confirmDeletecustomer}
				onClose={() => setConfirmDeletecustomer(false)}
				message={"Are you sure you want to delete this item"}
				onConfirm={confirmDelete}
			/>
			<BlockModal
				open={openBlock}
				onClose={() => setOpenBlock(false)}
				message={"Are you sure you want to modify user "}
				buttonName={blockButtonName}
				onConfirm={confirmBlock}
			/>
		</>
	);
};

export default Customers;
