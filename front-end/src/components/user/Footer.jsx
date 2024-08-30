import React from "react";
import logo from "../../assets/active-edge-high-resolution-logo-white-transparent.png";
import {
	FaFacebookSquare,
	FaLinkedin,
	FaInstagramSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white p-8 ">
			<div className="container mx-auto">
				<div className="flex flex-wrap justify-between">
					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<img className="w-36" src={logo} alt="" />
						<h2 className="text-xs font-normal mt-4">Social Media</h2>
						<ul className="mt-6 flex gap-2">
							<li>
								<FaFacebookSquare className="w-8 h-8 hover:text-gray-300 cursor-pointer" />
							</li>
							<li>
								<FaInstagramSquare className="w-8 h-8 hover:text-gray-300 cursor-pointer" />
							</li>
							<li>
								<FaSquareXTwitter className="w-8 h-8 hover:text-gray-300 cursor-pointer" />
							</li>
							<li>
								<FaLinkedin className="w-8 h-8 hover:text-gray-300 cursor-pointer" />
							</li>
						</ul>
					</div>

					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h3 className="text-lg font-semibold mb-4">SHOP</h3>
						<ul>
							<li>
								<a href="#" className="hover:text-gray-300">
									Products
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-300">
									Overview
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-300">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-300">
									Releases
								</a>
							</li>
						</ul>
					</div>

					<div className="w-full md:w-1/4 mb-6 md:mb-0">
						<h3 className="text-lg font-semibold mb-4">COMPANY</h3>
						<ul>
							<li>
								<a href="#" className="hover:text-gray-300">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-300">
									Contact
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-300">
									News
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-300">
									Support
								</a>
							</li>
						</ul>
					</div>

					<div className="w-full md:w-1/4">
						<h3 className="text-lg font-semibold mb-4">STAY UP TO DATE</h3>
						<form className="flex">
							<input
								type="email"
								placeholder="Enter your email"
								className="p-2 w-full rounded-l text-black"
							/>
							<button
								type="submit"
								className="bg-purple-600 text-white p-2 rounded-r"
							>
								SUBMIT
							</button>
						</form>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-700 flex justify-between items-center">
					<p>
						&copy; All rights reserved |{" "}
						<a href="#" className="text-purple-400">
							Privacy
						</a>{" "}
						|{" "}
						<a href="#" className="text-purple-400">
							Terms
						</a>
					</p>
					<p>Active Edge</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
