import axios from "axios";
import { logoutUser } from "../../redux/slices/authSlice";
import store from "../../redux/store/store";

const baseURL =
	import.meta.env.VITE_NODE_ENV === "production"
		? // ? "https://activeedge.shop/api"
		  "https://activeedge-backend.onrender.com/api"
		: "http://localhost:5000/api";

const api = axios.create({
	baseURL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			store.dispatch(logoutUser());
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default api;
