import axios from "axios";
const axiosInstance = axios.create({
	baseURL: "https://next-food-ordering-app-flame.vercel.app/api",
});

export default axiosInstance;
