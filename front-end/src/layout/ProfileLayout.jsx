import React, { useState } from "react";
import ProfileSideBar from "../components/user/ProfileSIdeBar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const ProfileLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex min-h-screen">
			<div className={`hidden lg:block w-64  bg-white shadow-md`}>
				<ProfileSideBar closeSidebar={toggleSidebar} />
			</div>

			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
					onClick={toggleSidebar}
				></div>
			)}

			<div
				className={`fixed top-0 left-0 z-30 h-full w-64 pt-24 bg-white shadow-md transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 lg:hidden`}
			>
				<ProfileSideBar closeSidebar={toggleSidebar} />
			</div>

			<button
				className="lg:hidden p-4 text-black fixed top-16 left-0 z-40"
				onClick={toggleSidebar}
			>
				<FaBars size={26} />
			</button>

			<div className="flex-grow lg:ml-64">
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;
