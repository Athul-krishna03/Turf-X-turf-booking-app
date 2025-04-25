import { PagenateTurfs } from "../../models/pageinated-turfs.entity";

export interface IGetAllTurfRequestsUseCase{
    execute(pageNumber:number,pageSize:number,searchTerm:string):Promise<PagenateTurfs>
}