import { IClientEntity } from "./client.entity";

export interface PagenateCustomers{
    users:IClientEntity[] | [],
    total:number
}