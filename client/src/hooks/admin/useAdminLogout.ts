import { useMutation } from "@tanstack/react-query";
import { logoutAdmin } from "../../services/admin/adminService";
export const useadminLogout = ()=>{
    return useMutation({
        mutationFn:logoutAdmin,
        onError:(error:Error)=>{
            console.log("Error on Logout user",error)
        }
    })
}