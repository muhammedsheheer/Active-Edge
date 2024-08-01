import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthanticateRoute = () => {
	const { role } = useSelector((state) => state.auth);
	console.log(role);
	return role == "admin" ? (
		<Navigate to="/dashboard" />
	) : role == "user" ? (
		<Navigate to="/" />
	) : (
		<Outlet />
	);
};

export default AuthanticateRoute;
