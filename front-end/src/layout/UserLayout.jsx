import React, { useEffect } from "react";
import NavBar from "../components/user/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/user/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getCarItems } from "../../redux/slices/cartSlice";

const UserLayout = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (user) {
			dispatch(getCarItems());
		}
	}, []);
	return (
		<div>
			<NavBar />
			<div className="py-28 px-20">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default UserLayout;
