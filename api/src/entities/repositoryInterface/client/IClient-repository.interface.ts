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
    ):Promise<{users:IClientEntity[] | [];total:number}>;
    findByIdAndUpdateStatus(id:string):Promise<void>
    findByIdAndUpdatePassWord(id:string,password:string):Promise<void>
    findById(id:string):Promise<IClientEntity | null>
    updateProfileById(clientId:string,data:Partial<IClientEntity>):Promise<ClientProfileResponse>;
}