import React from "react";
import ProfileSideBar from "../components/user/ProfileSIdeBar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
	return (
		<div className="flex">
			<ProfileSideBar />
			<div className="flex flex-col flex-grow ml-20">
				<main className="flex-grow  bg-white min-h-screen">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default ProfileLayout;
