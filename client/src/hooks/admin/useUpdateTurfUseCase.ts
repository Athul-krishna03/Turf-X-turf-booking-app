import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../useToaster"
import { updateTurfStatus } from "../../services/admin/adminService";
import { ITurf } from "../../types/Type";
import { turfReponse } from "./useGetAllTurfs";


export const useUpdateturfstatus = (currentPage:number,limit:number,search:string)=>{
    const {successToast,errorToast} = useToaster();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(turfId:string)=>updateTurfStatus(turfId),
        onMutate:async (turfId:string)=>{
            const queryKey = ["turfs",currentPage,limit,search] as const;
            await queryClient.cancelQueries({queryKey});

            const previousData = queryClient.getQueryData<turfReponse>(queryKey);
            console.log("prev data",previousData)

            queryClient.setQueryData(queryKey,(oldData:turfReponse | undefined)=>{
                if(!oldData || !oldData.turfs) return oldData;
                console.log("old",oldData);
                
                return {
                    ...oldData,
                    turfs:oldData.turfs.map((turf:ITurf)=>
                    turf._id === turfId ? {...turf,isBlocked:!turf.isBlocked}:turf)
                }
            });
            return {previousData,queryClient}
        },
        onSuccess:(data)=>{
            successToast(data.message);
        },
        onError: (error: any, _, context) => {
            // if (context?.previousData) {
            //     queryClient.setQueryData(context., context.previousData);
            // }
            // errorToast(error.response?.data?.message || "An error occurred");
        }
    })
}