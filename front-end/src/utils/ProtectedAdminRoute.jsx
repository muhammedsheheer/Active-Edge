import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
	const { role } = useSelector((state) => state.auth);
	console.log(role);
	return role == "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;
