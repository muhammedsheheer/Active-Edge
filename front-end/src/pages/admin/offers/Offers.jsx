import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import { MdDeleteOutline } from "react-icons/md";
import OfferModal from "../../../components/admin/OfferModal";
import BreadCrumbs from "../../../components/admin/BreadCrumbs";
import { useLocation } from "react-router-dom";
const Offers = () => {
	const [productOffers, setProductOffers] = useState([]);
	const [categoryOffers, setCategoryOffers] = useState([]);
	const [open, setOpen] = useState(false);

	const location = useLocation();

	const fetchOffers = async () => {
		try {
			const response = await api.get("/offer/get-offer");
			const { categoryOffer, productOffer } = response.data;
			setProductOffers(productOffer);
			setCategoryOffers(categoryOffer);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchOffers();
	}, []);

	const columns = [
		{ label: "Offer", field: "name" },
		{ label: "Offer Name", field: "offerName" },
		{ label: "Starting Date", field: "startDate" },
		{ label: "Ending Date", field: "endDate" },
		{ label: "Discount", field: "discount" },
	];

	const prductOfferData = productOffers?.map((offer) => ({
		name: (
			<div className="flex items-center">
				<img
					src={offer?.targetOfferId?.thumbnail}
					className="w-12 h-12 object-cover"
				/>
				<p>
					{offer?.targetOfferId?.productName.split(" ").slice(0, 1).join(" ")}
				</p>
			</div>
		),
		offerName: offer.name,
		startDate: new Date(offer?.startDate).toLocaleDateString(),
		endDate: new Date(offer?.endDate).toLocaleDateString(),
		discount: <div>{offer?.discountPercentage} %</div>,
	}));

	const categoryOfferData = categoryOffers?.map((offer) => ({
		name: offer?.targetOfferId?.categoryName,
		offerName: offer.name,
		startDate: new Date(offer?.startDate).toLocaleDateString(),
		endDate: new Date(offer?.endDate).toLocaleDateString(),
		discount: <div>{offer?.discountPercentage} %</div>,
		action: (
			<div>
				<MdDeleteOutline className="text-red-500 cursor-pointer text-xl" />
			</div>
		),
	}));
	return (
		<>
			<BreadCrumbs
				buttonName={"Add New Offers"}
				noButton={true}
				componentLocation={"Offers"}
				location={location.pathname}
				onClick={() => {
					console.log("Button clicked! Opening modal...");
					setOpen(true);
				}}
			/>
			<div className="w-full">
				<h1 className="font-bold text-xl text-gray-600 text-center">
					Product Offers
				</h1>
				<ReusableTable columns={columns} data={prductOfferData} />
			</div>
			<div className="w-full">
				<h1 className="font-bold text-xl text-gray-600 text-center">
					Category Offers
				</h1>
				<ReusableTable columns={columns} data={categoryOfferData} />
			</div>
			<OfferModal
				open={open}
				handleClose={() => setOpen(false)}
				productOffers={productOffers}
				categoryOffers={categoryOffers}
			/>
		</>
	);
};

export default Offers;
