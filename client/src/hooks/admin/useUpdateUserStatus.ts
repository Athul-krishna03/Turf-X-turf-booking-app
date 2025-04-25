import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../useToaster"
import { updateStatus } from "../../services/admin/adminService";
import { customerResponse } from "./useGetAllUsers";
import { IClient } from "../../types/Type";


export const useUpdateUserStatus = (currentPage:number,limit:number,search:string)=>{
    const {successToast,errorToast} = useToaster();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(userId:string)=>updateStatus(userId),
        onMutate:async (userId:string)=>{
            const queryKey = ["users",currentPage,limit,search] as const;
            await queryClient.cancelQueries({queryKey});

            const previousData = queryClient.getQueryData<customerResponse>(queryKey);
            console.log("prev user",previousData);
            

            queryClient.setQueryData(queryKey,(oldData:customerResponse | undefined)=>{
                if(!oldData || !oldData.users) return oldData;

                return {
                    ...oldData,
                    users:oldData.users.map((user:IClient)=>
                    user._id === userId ? {...user,isBlocked:!user.isBlocked}:user)
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