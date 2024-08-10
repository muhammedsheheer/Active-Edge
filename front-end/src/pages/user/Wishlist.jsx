import React from "react";
import { useSelector } from "react-redux";
import WishListComponent from "../../components/user/WishListComponent";

const Wishlist = () => {
	const { user } = useSelector((state) => state.auth);
	const userId = user;
	return <WishListComponent userId={userId} />;
};

export default Wishlist;
