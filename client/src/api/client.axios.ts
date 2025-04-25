import { useToast } from "../hooks/useToast";
import { userLogout } from "../store/slices/user.slice";
import { store } from "../store/store";
import axios from "axios";

const { toast } = useToast();

export const userAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PRIVATE_URL,
  withCredentials: true,
});

let isRefreshing = false;

userAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const orginalRequest = error.config;

    if (error.response?.status === 401 && !orginalRequest._retry) {
      orginalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await userAxiosInstance.post("/_us/user/refresh-token");
          isRefreshing = false;
          return userAxiosInstance(orginalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          store.dispatch(userLogout())
          window.location.href = "/";
          toast({
            title: "Error",
            description: "Please Login again",
            variant: "destructive",
            duration: 3000,
          });
          return Promise.reject(refreshError);
        }
      }
    }
    if (
      (error.response.status === 403 &&
        error.response.data.message ===
          "Access denied. You do not have permission to access this resource.") ||
      (error.response.status === 403 &&
        error.response.data.message === "Token is blacklisted") ||
      (error.response.status === 403 &&
        error.response.data.message ===
          "Access denied: Your account has been blocked" &&
        !orginalRequest._retry)
    ) {
      store.dispatch(userLogout())
      window.location.href = "/";
      toast({
        title: "Error",
        description: "Please Login again",
        variant: "destructive",
        duration: 3000,
      });
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
