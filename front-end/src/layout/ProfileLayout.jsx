import React, { useState } from "react";
import ProfileSideBar from "../components/user/ProfileSIdeBar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col md:flex-row">
			<div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
				<h2 className="text-white text-xl font-semibold">Profile</h2>
				<button className="text-white text-xl" onClick={toggleSidebar}>
					☰
				</button>
			</div>

			<div
				className={`${
					isSidebarOpen ? "block" : "hidden"
				} md:flex flex-col w-64 md:w-1/4 bg-gray-100 p-4 absolute md:relative z-10 md:static top-0 left-0 min-h-screen transition-all duration-300 ease-in-out`}
			>
				<ProfileSideBar />
			</div>

			<div className="flex flex-col flex-grow md:ml-4">
				<main className="flex-grow bg-white min-h-screen p-4">
					<Outlet />
				</main>
			</div>

			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 md:hidden"
					onClick={toggleSidebar}
				></div>
			)}
		</div>
	);
};

export default ProfileLayout;
