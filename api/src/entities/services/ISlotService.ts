import { ISlot } from "../../usecase/turf/GenerateSlotsUseCase"
import { ISlotEntity } from "../models/slot.entity"


export interface ISlotService{
    findBySlotId(slotId:string):Promise<ISlotEntity>
    validateAndGetSlots(slotId: string, duration: number):Promise<ISlotEntity[]>
    bookSlots(slots: ISlotEntity[]):Promise<ISlotEntity[]>
    releaseSlots(slots: ISlotEntity[]):Promise<ISlotEntity[]>
}