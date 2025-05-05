import { ISlotEntity } from "../../models/slot.entity";

export interface IGetSlotUseCase{
    execute(turfId:string,date:string):Promise<ISlotEntity[]>
}