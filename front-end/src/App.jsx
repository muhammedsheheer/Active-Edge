import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import Product from "./pages/admin/product/Product";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OTPVerification from "./pages/user/OTPVerification ";
import HomePage from "./pages/user/HomePage";
import Profile from "./pages/user/Profile";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import AdminLayout from "./layout/AdminLayoutRoute";
import Category from "./pages/admin/category/Categorys";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import AuthanticateRoute from "./utils/Authantication";
import ProtectedUserRoute from "./utils/ProtectedUserRoute";
import UserLayout from "./layout/UserLayout";
import ProductForm from "./components/admin/ProductForm";
import ProductDetailPage from "./pages/user/ProductDetailPage";
import Customers from "./pages/admin/customers/Customer.jsx";

function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route element={<AuthanticateRoute />}>
					<Route path="/login" element={<UserLogin />} />
					<Route path="/register" element={<UserRegister />} />
					<Route path="/otp" element={<OTPVerification />} />
				</Route>
				<Route element={<UserLayout />}>
					<Route index path="/" element={<HomePage />} />
					<Route path="/productDetials/:id" element={<ProductDetailPage />} />
					<Route element={<ProtectedUserRoute />}>
						<Route path="/profile" element={<Profile />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/wishlist" element={<Wishlist />} />
					</Route>
				</Route>
				{/* {admin routes} */}
				<Route element={<ProtectedAdminRoute />}>
					<Route path="/dashboard" element={<AdminLayout />}>
						<Route path="products" element={<Product />} />
						<Route path="addNewProduct" element={<ProductForm />} />
						<Route path="editproduct/:productId" element={<ProductForm />} />
						<Route path="categorys" element={<Category />} />
						<Route path="customers" element={<Customers />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
