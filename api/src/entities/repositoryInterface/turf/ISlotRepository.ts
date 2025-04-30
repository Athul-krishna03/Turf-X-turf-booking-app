import { ISlotEntity } from "../../models/slot.entity";

export interface ISlotRepository{
    createSlots(slots:ISlotEntity[]):Promise<ISlotEntity[]>
}