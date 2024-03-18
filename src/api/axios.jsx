import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ecommerce-backend-gr3e.onrender.com/api/",
});

const loginDetailRaw = localStorage.getItem("loginDetail");
const loginDetail = JSON.parse(loginDetailRaw);

const initialData = {
  email: loginDetail?.email,
  refresh_token: loginDetail?.refreshToken,
};

const refreshAccessToken = async () => {
  const res = await axios.post(
    "https://ecommerce-backend-gr3e.onrender.com/api/auth/refresh-token",
    initialData
  );
  return res.data.data.access_token;
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status == 401) {
      // Access token has expired, refresh it
      try {
        const newAccessToken = await refreshAccessToken();
        // Update the request headers with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        localStorage.setItem(
          "loginDetail",
          JSON.stringify({ ...loginDetail, accessToken: newAccessToken })
        );

        // Retry the original request
        return axiosClient(error.config);
      } catch (refreshError) {
        // Handle token refresh error
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
