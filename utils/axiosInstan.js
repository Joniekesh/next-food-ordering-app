import axios from "axios";
export const axiosInstance = axios.create({
	baseURL: "https://next-food-ordering-app-six.vercel.app/api",
});
