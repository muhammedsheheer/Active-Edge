import React from "react";

const SportsFitBanner = () => {
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
				<button className="bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-800 transition duration-300">
					EXPLORE NOW
				</button>
			</div>

			{/* Image Section */}
			<div className="flex-1 flex justify-center">
				<div className="w-full max-w-xs sm:max-w-sm md:max-w-full">
					<img
						src="https://images.hdqwalls.com/download/neymar-jr-brazil-portraits-f1-3840x2400.jpg"
						alt="Sports Fit"
						className="w-full h-auto object-cover rounded-md shadow-lg border border-gray-200"
					/>
				</div>
			</div>
		</div>
	);
};

export default SportsFitBanner;
