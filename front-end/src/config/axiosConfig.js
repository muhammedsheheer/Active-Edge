import axios from "axios";
import { logoutUser } from "../../redux/slices/authSlice";
import store from "../../redux/store/store";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
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
