import { updateRequestStatus } from "../../services/admin/adminService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToaster } from "../useToaster";
import { turfReponse } from "./useGetAllTurfs";
import { ITurf } from "../../types/Type";


export const useUpdateTurfRequest = (currentPage: number, limit: number, search: string) => {
    const { successToast, errorToast } = useToaster();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ turfId, status,reason }: { turfId: string; status: "approved" | "rejected" ,reason?:string}) =>
            updateRequestStatus(turfId, status,reason),
        onMutate: async ({ turfId, status }: { turfId: string; status: "approved" | "rejected"; reason?: string }) => {
            const queryKey = ["turfs", currentPage, limit, search] as const;
            await queryClient.cancelQueries({ queryKey });
            const previousData = queryClient.getQueryData<turfReponse>(queryKey);
            queryClient.setQueryData(queryKey, (oldData: turfReponse | undefined) => {
            if (!oldData || !oldData.turfs) return oldData;
            const updatedTurfs = oldData.turfs.map((turf: ITurf) =>
                turf._id === turfId ? { ...turf, status } : turf
            );
              // Filter out turfs with status === "approved"
            const filteredTurfs = updatedTurfs.filter((turf) => turf.status !== "approved");
            return {
                ...oldData,
                turfs: filteredTurfs,
            };
            });
            return { previousData, queryClient };
        },  
        
        onSuccess: (data:any) => {
            successToast(data.message); 
            queryClient.invalidateQueries({ queryKey: ["turfRequest", currentPage, limit, search] });
        },
        onError: (error: any) => {
            errorToast(error.response?.data?.message || "An error occurred while updating seller status");
        },
    });
};
