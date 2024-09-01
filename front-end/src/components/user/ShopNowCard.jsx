import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

const ShopNowCard = () => {
	const navigate = useNavigate();
	const handleMen = () => {
		window.scrollTo({ top: 0 });
		navigate("/men");
	};

	const handleWomen = () => {
		window.scrollTo({ top: 0 });
		navigate("/women");
	};

	const handleKids = () => {
		window.scrollTo({ top: 0 });
		navigate("/kids");
	};
	return (
		<div className="mt-12">
			<h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 leading-snug tracking-wide">
				<span className="font-light">Shop</span>
				<span className="font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-400">
					Our Latest Collection
				</span>
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
				{/* Men's Collection */}
				<div>
					<div
						onClick={handleMen}
						className="group relative block cursor-pointer "
					>
						<div className="relative h-[250px] sm:h-[350px]">
							<img
								src="https://i.pinimg.com/originals/77/cf/9c/77cf9c906545249e734a649339a21b87.jpg"
								alt="Men's Collection"
								className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
							/>

							<img
								src="https://i.pinimg.com/originals/91/ea/06/91ea0618d6a45c0d76c97d7cfe703070.jpg"
								alt="Men's Collection Hover"
								className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
							/>
						</div>

						<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
							<h3 className="text-xl font-medium text-white">
								Men's Collection
							</h3>
							<p className="mt-1.5 text-xs text-white">
								Explore our selection of Men's Boots, Jerseys, and Training
								Suits. Gear up in style for every occasion.
							</p>
							<button
								onClick={handleMen}
								className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-lg cursor-pointer"
							>
								Shop Now
							</button>
						</div>
					</div>
				</div>

				{/* Women's Collection */}
				<div>
					<div
						onClick={handleWomen}
						className="group relative block cursor-pointer"
					>
						<div className="relative h-[250px] sm:h-[350px]">
							<img
								src="https://i.pinimg.com/originals/a4/db/a2/a4dba283b9c27320e92897f87bf04ab1.jpg"
								alt="Women's Collection"
								className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
							/>

							<img
								src="https://i.pinimg.com/originals/5e/41/c4/5e41c47964758057296e948024ddbb98.jpg"
								alt="Women's Collection Hover"
								className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
							/>
						</div>

						<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
							<h3 className="text-xl font-medium text-white">
								Women's Collection
							</h3>
							<p className="mt-1.5 text-xs text-white">
								Discover our latest Women's Dresses, Handbags, and Shoes.
								Perfect styles for every moment.
							</p>
							<span
								onClick={handleWomen}
								className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-lg cursor-pointer"
							>
								Shop Now
							</span>
						</div>
					</div>
				</div>

				{/* Kids' Collection */}
				<div>
					<div
						onClick={handleKids}
						className="group relative block cursor-pointer"
					>
						<div className="relative h-[250px] sm:h-[350px]">
							<img
								src="https://i.pinimg.com/originals/c3/96/8e/c3968e439bd0d45aa169c90ac74aebea.jpg"
								alt="Kids' Collection"
								className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
							/>

							<img
								src="https://i.pinimg.com/564x/a9/ca/98/a9ca989c98c43004290a28b55d2883c6.jpg"
								alt="Kids' Collection Hover"
								className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
							/>
						</div>

						<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
							<h3 className="text-xl font-medium text-white">
								Kids' Collection
							</h3>
							<p className="mt-1.5 text-xs text-white">
								Browse our Kids' Clothes, Shoes, and Toys. Fun, comfortable, and
								ready for playtime.
							</p>
							<span
								onClick={handleKids}
								className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded-lg cursor-pointer"
							>
								Shop Now
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShopNowCard;
