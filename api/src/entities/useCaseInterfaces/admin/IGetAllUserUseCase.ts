import { PagenateCustomers } from "../../models/pageinated-users.entity";

export interface IGetAllUsersUseCase{
    execute(pageNumber:number,pageSize:number,searchTerm:string):Promise<PagenateCustomers>
}