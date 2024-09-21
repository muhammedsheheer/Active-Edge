// import React from "react";
// import ProfileSideBar from "../components/user/ProfileSIdeBar";
// import { Outlet } from "react-router-dom";

// const ProfileLayout = () => {
// 	return (
// 		<div className="  flex">
// 			<ProfileSideBar />
// 			<div className="flex flex-col flex-grow ml-20">
// 				<main className="flex-grow  bg-white min-h-screen">
// 					<Outlet />
// 				</main>
// 			</div>
// 		</div>
// 	);
// };

// export default ProfileLayout;

import React, { useState } from "react";
import ProfileSideBar from "../components/user/ProfileSIdeBar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<div className="md:hidden bg-blue-600 p-4 flex justify-between items-center shadow-lg">
				<h2 className="text-white text-2xl font-bold">Profile</h2>
				<button
					className="text-white text-3xl focus:outline-none"
					onClick={toggleSidebar}
				>
					☰
				</button>
			</div>

			<div
				className={`${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 fixed md:relative top-0 left-0 w-64 bg-gray-100 shadow-md md:shadow-none z-30 h-full md:h-auto transition-transform duration-300 ease-in-out`}
			>
				<ProfileSideBar />
			</div>

			<div className="flex-grow bg-gray-50 p-4">
				<Outlet />
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
