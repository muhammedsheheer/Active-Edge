import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
			<img
				src="/404-landing-page.png"
				alt="Empty Stadium"
				className="w-full max-w-lg mb-8"
			/>
			<h1 className="text-4xl font-bold mb-4 text-gray-800">
				404 - Page Not Found
			</h1>
			<p className="text-lg text-gray-600 mb-6">
				Oops! The page you are looking for doesn’t exist.
			</p>
			<Link to="/">
				<button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-all">
					Go Back to Home
				</button>
			</Link>
		</div>
	);
};

export default NotFoundPage;
