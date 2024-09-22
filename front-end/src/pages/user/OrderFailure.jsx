import { useLocation, useNavigate } from "react-router-dom";

const OrderFailure = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { totalAmount, discount, discountedAmount, selectedAddress } =
		location.state || {};

	const handleRetry = () => {
		navigate("/payment", {
			state: {
				totalAmount,
				discount,
				discountedAmount,
				selectedAddress,
			},
		});
	};

	const handleHome = () => {
		navigate("/");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
			<div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full animate__animated animate__fadeIn">
				<div className="flex justify-center mb-6">
					<div className="bg-red-100 p-4 rounded-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							className="w-10 h-10 text-red-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div>
				</div>
				<h2 className="text-center text-2xl font-bold text-red-700 mb-4">
					Order Failed
				</h2>
				<p className="text-center text-gray-600 mb-8">
					Sorry, there was an issue with processing your order. Please try again
					or contact support if the problem persists.
				</p>
				<div className="flex flex-col gap-4">
					<button
						onClick={handleRetry}
						className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
					>
						Retry Payment
					</button>
					<button
						onClick={handleHome}
						className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-transform transform hover:scale-105"
					>
						Continue to Shop
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderFailure;
