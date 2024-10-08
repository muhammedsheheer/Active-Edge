import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({
	componentLocation,
	location,
	goback,
	buttonName,
	buttonNavigate,
	noButton,
	onClick,
}) => {
	return (
		<div className="flex justify-between items-center px-10 py-5 mb-4">
			<div>
				<h1 className="text-2xl font-bold">{componentLocation}</h1>
				<Link to={goback}>
					<nav className="text-gray-600 text-sm">{location}</nav>
				</Link>
			</div>
			<Link to={buttonNavigate}>
				<div className="flex items-center">
					{noButton && (
						<button
							className="bg-black text-white p-2 rounded-md flex items-center"
							onClick={onClick}
						>
							<span className="mx-2">{buttonName}</span>
						</button>
					)}
				</div>
			</Link>
		</div>
	);
};

export default BreadCrumbs;
