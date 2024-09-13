import React, { useState, useRef, useEffect } from "react";
import { CiHeart, CiShoppingCart, CiUser, CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/active-edge-high-resolution-logo-black-transparent.png";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
	const { user } = useSelector((state) => state.auth);
	const items = useSelector(
		(state) => state.cart?.cartItems?.items?.length || 0
	);
	const dispatch = useDispatch();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [searchVisible, setSearchVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const inputRef = useRef(null);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const handleSearchToggle = () => {
		setSearchVisible(true);
		setTimeout(() => inputRef.current.focus(), 0);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const navigate = useNavigate();

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		window.scrollTo({ top: 450 });
		navigate(`/shop?search=${searchTerm}`);
		setSearchTerm("");
		setSearchVisible(false);
	};

	const handleClickOutside = (event) => {
		if (inputRef.current && !inputRef.current.contains(event.target)) {
			setSearchVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleMobileMenuItemClick = () => {
		setMobileMenuOpen(false);
	};

	return (
		<nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded={mobileMenuOpen}
							onClick={toggleMobileMenu}
						>
							<span className="sr-only">Open main menu</span>
							{mobileMenuOpen ? (
								<RiCloseLargeLine className="block h-6 w-6" />
							) : (
								<FaBars className="block h-6 w-6" />
							)}
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex-shrink-0 hidden sm:block">
							<Link to={"/"}>
								<img className="w-28 h-8" src={logo} alt="Active Edge" />
							</Link>
						</div>
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								<Link
									to="/"
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "instant" })
									}
									className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									HOME
								</Link>
								<Link
									to="/shop"
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "instant" })
									}
									className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									SHOP
								</Link>
								<Link
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "instant" })
									}
									to="/men"
									className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									MENS
								</Link>
								<Link
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "instant" })
									}
									to="/women"
									className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									WOMENS
								</Link>
								<Link
									onClick={() =>
										window.scrollTo({ top: 0, behavior: "instant" })
									}
									to="/kids"
									className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
								>
									KIDS
								</Link>
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						{searchVisible ? (
							<form onSubmit={handleSearchSubmit} className="relative">
								<input
									type="text"
									value={searchTerm}
									onChange={handleSearchChange}
									placeholder="Search"
									className="p-1 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
									ref={inputRef}
								/>
								<button
									type="submit"
									className="absolute inset-y-0 left-0 pl-3 flex items-center"
								>
									<CiSearch className="h-6 w-6 text-gray-400" />
								</button>
							</form>
						) : (
							<button
								onClick={handleSearchToggle}
								className="p-1 rounded-full text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							>
								<span className="sr-only">Search</span>
								<CiSearch className="h-6 w-6" />
							</button>
						)}

						<Link
							to={user ? "/wishlist" : "/login"}
							onClick={() => window.scrollTo(0, 0)}
							className="ml-3 p-1 rounded-full text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						>
							<span className="sr-only">Favorites</span>

							<CiHeart className="h-6 w-6" />
						</Link>
						<Link
							to={user ? "/cart" : "/login"}
							onClick={() => window.scrollTo(0, 0)}
							className="relative ml-3 p-1 rounded-full text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						>
							<span className="sr-only">Cart</span>
							<CiShoppingCart className="h-6 w-6" />
							{items > 0 && (
								<span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full">
									{items}
								</span>
							)}
						</Link>
						<Link
							to={user ? "/profile" : "/login"}
							onClick={() => window.scrollTo(0, 0)}
							className="ml-3 p-1 rounded-full text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						>
							<span className="sr-only">User</span>
							<CiUser className="h-6 w-6" />
						</Link>
					</div>
				</div>
			</div>

			<div
				className={`${mobileMenuOpen ? "block" : "hidden"} sm:hidden`}
				id="mobile-menu"
			>
				<div className="px-2 pt-2 pb-3 space-y-1">
					<Link
						to="/"
						className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						onClick={handleMobileMenuItemClick}
					>
						HOME
					</Link>
					<Link
						to="/shop"
						className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						onClick={handleMobileMenuItemClick}
					>
						SHOP
					</Link>
					<Link
						to="/men"
						className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						onClick={handleMobileMenuItemClick}
					>
						MENS
					</Link>
					<Link
						to="/women"
						className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						onClick={handleMobileMenuItemClick}
					>
						WOMENS
					</Link>
					<Link
						to="/kids"
						className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						onClick={handleMobileMenuItemClick}
					>
						KIDS
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
