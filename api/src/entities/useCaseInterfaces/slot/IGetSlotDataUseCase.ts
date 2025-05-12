import { ISlotEntity } from "../../models/slot.entity";

export interface IGetSlotDataUseCase{
    execute(slotId:string):Promise<ISlotEntity>
}