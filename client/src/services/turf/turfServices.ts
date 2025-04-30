import { turfAxiosInstance } from "../../api/turf.axios"
import { ChangePasswordData } from "../../hooks/user/userDashboard";


export const logoutTurf = async () => {
    const response = await turfAxiosInstance.post("/_ts/turf/logout");
    return response.data;
  };
export  const generateSlots = async(turfId: string, date: string, startTime: string,endTime: string, slotDuration: number)=>{
    const response = await turfAxiosInstance.post('/_ts/turf/generateSlots',
        {
            turfId,
            date,
            startTime,
            endTime,
            slotDuration
        }
    );
    return response.data
}

export const changeTurfPassword = async (data: ChangePasswordData) => {
    const response = await turfAxiosInstance.patch(
    "/_ts/turf/change-password",
    data
    );
    console.log("changeturfPassword response", response);
    return response.data;
};