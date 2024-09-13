import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const CheckOutWrapper = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log(location.state);

	if (location.state) {
		return <Outlet />;
	} else {
		return <Navigate to="/cart" replace />;
	}
};

export default CheckOutWrapper;
