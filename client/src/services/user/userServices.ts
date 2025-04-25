import { userAxiosInstance } from "../../api/client.axios";

export const logoutUser = async () => {
    const response = await userAxiosInstance.post("/_us/user/logout");
    return response.data;
  };