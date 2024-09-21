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
import { HiMenu } from "react-icons/hi";

const ProfileLayout = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<div
				className={`fixed inset-y-0 left-0 z-20 transform bg-white shadow-md w-64 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
				}`}
			>
				<ProfileSideBar
					isSidebarOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
				/>
			</div>

			<button
				className="md:hidden p-4 fixed top-2 left-2 z-30 bg-gray-800 text-white rounded-full"
				onClick={toggleSidebar}
			>
				<HiMenu size={24} />
			</button>

			<div className="flex flex-col flex-grow ml-0 md:ml-64">
				<main className="flex-grow bg-gray-50 min-h-screen p-4 md:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default ProfileLayout;
