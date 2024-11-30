import axios from "axios";
import queryClient from "./queryClient";
import { navigate } from "@/lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);
const API = axios.create(options);

let isRefreshing = false;

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    // refresh access token if it's expired
    if (status === 401 && data.errorCode === "InvalidAccessToken") {
      if (isRefreshing) {
        isRefreshing = true;
        try {
          await TokenRefreshClient.get("/auth/refresh");
          return TokenRefreshClient(config);
        } catch (error) {
          isRefreshing = false;
          console.log(error);
          queryClient.clear();
          navigate("/login", {
            state: { redirectUrl: window.location.pathname },
          });
        }
      }
    }
    return Promise.reject({ status, ...data });
  }
);

export default API;
