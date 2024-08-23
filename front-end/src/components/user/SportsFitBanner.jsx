import React from "react";

const SportsFitBanner = ({ image }) => {
	const handle = () => {
		window.scroll({ top: 450 });
	};
	return (
		<div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 sm:p-6 md:p-12 shadow-lg rounded-md">
			{/* Text Section */}
			<div className="flex-1 text-center md:text-left mb-6 md:mb-0">
				<h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-gray-800">
					Discover and Find Your Own Sports Fit!
				</h1>
				<p className="text-gray-600 mb-6">
					Explore our curated collection of stylish clothing and accessories
					tailored to your unique taste.
				</p>
				<button
					onClick={handle}
					className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition duration-300"
				>
					EXPLORE NOW
				</button>
			</div>

			{/* Image Section */}
			<div className="flex-1 flex justify-center">
				<div className="w-full max-w-xs sm:max-w-sm md:max-w-full">
					<img
						src={image}
						alt="Sports Fit"
						className="w-full h-72 object-cover rounded-md shadow-lg border border-gray-200"
					/>
				</div>
			</div>
		</div>
	);
};

export default SportsFitBanner;
