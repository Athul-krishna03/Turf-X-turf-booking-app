
import { adminAxiosInstance } from "../../api/admin.axios";


export const getAllUsers = async({
    page=1,
    limit=10,
    search=""
}:{
    page:number,
    limit:number,
    search:string
})=>{
    const reponse = await adminAxiosInstance.get("/_ad/admin/get-Users",{
        params:{
            page,
            limit,
            search
        }
    });
    return reponse.data
}

export const logoutAdmin = async()=>{
    const response = await adminAxiosInstance.post("/_ad/admin/logout");
    return response.data
}

export const updateStatus = async (turfId:string) => {
    try {
        const reponse = await adminAxiosInstance.patch(`/_ad/admin/user-status/${turfId}`,{});
        return reponse.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Failed to update status");
    }
}

export const updateTurfStatus = async (turfId:string) => {
    try {
        const reponse = await adminAxiosInstance.patch(`/_ad/admin/turf-status/${turfId}`,{});
        return reponse.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Failed to update status");
    }
}

export const getAllTurfs = async({
    page=1,
    limit=10,
    search=""
}:{
    page:number,
    limit:number,
    search:string
})=>{
    const reponse = await adminAxiosInstance.get("/_ad/admin/get-Turfs",{
        params:{
            page,
            limit,
            search
        }
    });
    return reponse.data
}

export const getAllTurfRequests = async({
    page=1,
    limit=10,
    search=""
}:{
    page:number,
    limit:number,
    search:string
})=>{
    const reponse = await adminAxiosInstance.get("/_ad/admin/get-Requests",{
        params:{
            page,
            limit,
            search
        }
    });
    return reponse.data
}
export const updateRequestStatus = async (turfId:string,status:string,reason?:string) => {
    try {
        const reponse = await adminAxiosInstance.patch(`/_ad/admin/request-status/${turfId}`,{status,reason});
        return reponse.data
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Failed to update status");
    }
}