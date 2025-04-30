import { TurfProfileResponse } from "../../../shared/dtos/user.dto";
import { ITurfEntity } from "../../models/turf.entity";

export interface IUpdateTurfProfileUseCase{
    execute(turfId:string,data:Partial<ITurfEntity>):Promise<TurfProfileResponse>
}