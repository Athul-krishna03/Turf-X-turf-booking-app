import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "../../services/auth/authServices";
import { changeTurfPassword } from "../../services/turf/turfServices";



export interface ChangePasswordData { 
    currPass: string;
    newPass: string;
}


export const useTurfChangePassword=()=>{
    return useMutation<AxiosResponse,Error,ChangePasswordData>({
        mutationFn:changeTurfPassword
    })
}