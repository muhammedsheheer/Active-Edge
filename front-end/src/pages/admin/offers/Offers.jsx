import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import { MdDeleteOutline } from "react-icons/md";
import OfferModal from "../../../components/admin/OfferModal";
import BreadCrumbs from "../../../components/admin/BreadCrumbs";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/common/Pagination";
const Offers = () => {
	const [currentPageProductOffer, setCurrentPageProductOffer] = useState(1);
	const [itemsPerPageProduct] = useState(2);
	const [currentPageCategoryOffer, setCurrentPageCategoryOffer] = useState(1);
	const [itemsPerPageCategory] = useState(2);
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

	const indexOfLastItemProduct = currentPageProductOffer * itemsPerPageProduct;
	const indexOfFirstItemProduct = indexOfLastItemProduct - itemsPerPageProduct;
	const currentItemsOfProduct = productOffers.slice(
		indexOfFirstItemProduct,
		indexOfLastItemProduct
	);

	const indexOfLastItemCategory =
		currentPageCategoryOffer * itemsPerPageCategory;
	const indexOfFirstItemCategory =
		indexOfLastItemCategory - itemsPerPageCategory;
	const currentItemsOfCategory = categoryOffers.slice(
		indexOfFirstItemCategory,
		indexOfLastItemCategory
	);

	const columns = [
		{ label: "Offer", field: "name" },
		{ label: "Offer Name", field: "offerName" },
		{ label: "Starting Date", field: "startDate" },
		{ label: "Ending Date", field: "endDate" },
		{ label: "Discount", field: "discount" },
	];

	const prductOfferData = currentItemsOfProduct?.map((offer) => ({
		name: (
			<div className="flex items-center">
				<img
					src={offer?.targetOfferId?.thumbnail}
					className="w-12 h-12 object-cover"
				/>
				{console.log(offer?.targetOfferId?.thumbnail)}
				<p>
					{offer?.targetOfferId?.productName?.split(" ").slice(0, 1).join(" ")}
				</p>
			</div>
		),
		offerName: offer?.name,
		startDate: new Date(offer?.startDate).toLocaleDateString(),
		endDate: new Date(offer?.endDate).toLocaleDateString(),
		discount: <div>{offer?.discountPercentage} %</div>,
	}));

	const categoryOfferData = currentItemsOfCategory?.map((offer) => ({
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
				<div>
					<Pagination
						currentPage={currentPageProductOffer}
						totalPages={Math.ceil(productOffers.length / itemsPerPageProduct)}
						onPageChange={(page) => setCurrentPageProductOffer(page)}
					/>
				</div>
			</div>
			<div className="w-full">
				<h1 className="font-bold text-xl text-gray-600 text-center">
					Category Offers
				</h1>
				<ReusableTable columns={columns} data={categoryOfferData} />
				<div>
					<Pagination
						currentPage={currentPageCategoryOffer}
						totalPages={Math.ceil(categoryOffers.length / itemsPerPageCategory)}
						onPageChange={(page) => setCurrentPageCategoryOffer(page)}
					/>
				</div>
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
