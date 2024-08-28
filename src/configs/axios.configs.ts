import { useKeycloak } from "@react-keycloak/web";
import axios, { InternalAxiosRequestConfig } from "axios";

const useAxiosInstance = () => {
  const { keycloak } = useKeycloak();

  // Buat instance Axios
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_PLACEHOLDER,
  });

  // Request Interceptor untuk menambahkan access token ke header Authorization
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (keycloak.token) {
        const token = keycloak.token;

        // Tambahkan Authorization header
        config.headers.Authorization = `Bearer ${token}`;

        // Cek apakah token masih valid atau perlu di-refresh
        const isTokenExpired = keycloak.isTokenExpired(10); // Check if token will expire in 10 seconds
        if (isTokenExpired) {
          try {
            await keycloak.updateToken(30); // Refresh token if it will expire in 30 seconds
            config.headers.Authorization = `Bearer ${keycloak.token}`;
          } catch (error) {
            console.error("Failed to refresh token:", error);
            alert(
              "Oops! sepertinya sesi anda telah habis, silahkan login kembali..."
            );
            keycloak.logout(); // Logout user if 401 Unauthorized is received
          }
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor (opsional)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      // Handle unauthorized errors or token expiration
      if (error.response?.status === 401) {
        alert(
          "Oops! sepertinya sesi anda telah habis, silahkan login kembali..."
        );
        keycloak.logout(); // Logout user if 401 Unauthorized is received
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
