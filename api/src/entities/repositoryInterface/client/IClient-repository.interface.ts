import { ObjectExpression } from "mongoose";
import { ClientProfileResponse } from "../../../shared/dtos/user.dto";
import { IClientEntity } from "../../models/client.entity";

export interface IClientRepository{
    save(data:Partial<IClientEntity>):Promise<IClientEntity>;
    findByEmail(email:string):Promise<IClientEntity | null>;
    find(
        filter:any,
        skip:number,
        limit:number
    ):Promise<{users:IClientEntity[] | [];total:number}>
}