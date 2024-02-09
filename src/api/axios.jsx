import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ecommerce-backend-gr3e.onrender.com/api/",
});

export default axiosClient;
