import React from "react";
import SideDashboard from "../../components/SideDashboard";

const Dashboard = () => {
	return (
		<>
			<div className="flex">
				<SideDashboard />
				<div className="bg-gray-100 w-full">
					<h1>Helloi</h1>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
