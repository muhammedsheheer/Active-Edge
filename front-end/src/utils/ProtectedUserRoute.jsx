import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
	const { role } = useSelector((state) => state.auth);
	return role === "user" ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedUserRoute;
