import { useQuery } from "@tanstack/react-query";
import { FetchCustomerParams } from "../../types/AdminTypes";
import { IClient } from "../../types/Type";

export type customerResponse ={
    users:IClient[];
    totalPages:number;
    currentPage:number
}

export const useGetAllUsersQuery=(
    queryFunc:(params:FetchCustomerParams)=>Promise<customerResponse>,
    page:number,
    limit:number,
    search:string,
)=>{
    return useQuery({
        queryKey:["users",page,limit,search],
        queryFn:()=>queryFunc({page,limit,search}),
        placeholderData:(prev)=>prev?{...prev}:undefined,
    })
}