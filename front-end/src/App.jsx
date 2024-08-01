import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import Dashboard from "./pages/admin/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OTPVerification from "./pages/user/OTPVerification ";
import HomePage from "./pages/user/HomePage";
import Profile from "./pages/user/Profile";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/login" element={<UserLogin />} />
				<Route path="/register" element={<UserRegister />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/otp" element={<OTPVerification />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/wishlist" element={<Wishlist />} />
			</Routes>
		</>
	);
}

export default App;
