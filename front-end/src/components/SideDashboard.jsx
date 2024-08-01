import React from "react";
import { Link } from "react-router-dom";

const SideDashboard = () => {
	return (
		<>
			<div className="w-48 bg-red-700 h-screen">
				<div className="ml-6">
					<ul>
						<li>
							<Link to={"#"}>Dashboard</Link>
						</li>
						<li>
							<Link to={"#"}>Products</Link>
						</li>
						<li>
							{" "}
							<Link to={"#"}>Categories</Link>
						</li>
						<li>
							{" "}
							<Link to={"#"}>Orders</Link>
						</li>
						<li>
							{" "}
							<Link to={"#"}>Coupens</Link>
						</li>
						<li>
							{" "}
							<Link to={"#"}>Customers</Link>
						</li>
						<li>
							{" "}
							<Link to={"#"}>Orders</Link>
						</li>
						<li>
							{" "}
							<Link to={"#"}>Sales Report</Link>
						</li>
					</ul>
					<button>Logout</button>
				</div>
			</div>
		</>
	);
};

export default SideDashboard;
