import { userAxiosInstance } from "../../api/client.axios";
import { ChangePasswordData } from "../../hooks/user/userDashboard";

export const logoutUser = async () => {
    const response = await userAxiosInstance.post("/_us/user/logout");
    return response.data;
  };


  export const changePassword = async (data: ChangePasswordData) => {
    const response = await userAxiosInstance.patch(
      "/_us/user/change-password",
      data
    );
    console.log("changePassword response", response);
    return response.data;
  };


  export const getAllTurfsData = async({
      page=1,
      limit=10,
      search=""
  }:{
      page:number,
      limit:number,
      search:string
  })=>{
      const reponse = await userAxiosInstance.get("/_us/user/get-Turfs",{
          params:{
              page,
              limit,
              search
          }
      });
      return reponse.data
  }