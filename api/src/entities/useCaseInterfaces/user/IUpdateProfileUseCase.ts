import { ClientProfileResponse } from "../../../shared/dtos/user.dto";
import { IClientEntity } from "../../models/client.entity";

export interface IUpdateProfileUseCase{
    execute(clientId:string,data:Partial<IClientEntity>):Promise<ClientProfileResponse>
}