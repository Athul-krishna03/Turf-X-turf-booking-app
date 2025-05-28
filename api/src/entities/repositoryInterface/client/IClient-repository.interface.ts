import { ObjectExpression } from "mongoose";

import { IClientEntity } from "../../models/client.entity";
import { ClientProfileResponse } from "../../../shared/responseTypes/clientProfileResponse";

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
    findByIdAndUpdateWallet(id: string, amount: number): Promise<IClientEntity | null>
    updateProfileById(clientId:string,data:Partial<IClientEntity>):Promise<ClientProfileResponse>;
}