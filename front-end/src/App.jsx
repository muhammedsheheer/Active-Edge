import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import Product from "./pages/admin/product/Product";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OTPVerification from "./pages/user/OTPVerification ";
import HomePage from "./pages/user/HomePage";
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
import EditProfile from "./components/user/EditProfile.jsx";
import Women from "./pages/user/Women.jsx";
import CheckOutPage from "./pages/user/CheckOutPage.jsx";
import PaymentPage from "./pages/user/PaymentPage.jsx";
import OrderConfirmation from "./pages/user/OrderConfirmation.jsx";
import OrderHistory from "./pages/user/OrderHistory.jsx";
import Order from "./pages/admin/order/Order.jsx";
import OrderDetails from "./pages/admin/order/OrderDetails.jsx";
import AddressPage from "./pages/user/AddressPage.jsx";
import Shop from "./pages/user/Shop.jsx";
import ProfileLayout from "./layout/ProfileLayout.jsx";
import Men from "./pages/user/Men.jsx";
import Kids from "./pages/user/Kids.jsx";

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
					<Route path="/women" element={<Women />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/men" element={<Men />} />
					<Route path="/kids" element={<Kids />} />
					<Route element={<ProtectedUserRoute />}>
						<Route path="/profile" element={<Outlet />}>
							<Route index element={<Navigate to="editProfile" replace />} />
							<Route element={<ProfileLayout />}>
								<Route path="editProfile" element={<EditProfile />} />
								<Route path="address" element={<AddressPage />} />
								<Route path="orderHistory" element={<OrderHistory />} />
							</Route>
						</Route>
						<Route path="/cart" element={<Cart />} />
						<Route path="/wishlist" element={<Wishlist />} />
						<Route path="/checkOut" element={<CheckOutPage />} />
						<Route path="/payment" element={<PaymentPage />} />
						<Route path="/confirmation" element={<OrderConfirmation />} />
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
						<Route path="orderDetails/:id" element={<OrderDetails />} />
						<Route path="orders" element={<Order />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
