import { ISlot } from "../../../usecase/turf/GenerateSlotsUseCase";
import { ISlotEntity } from "../../models/slot.entity";

export interface ISlotRepository{
    createSlots(slots:ISlot[]):Promise<ISlotEntity[]>
    findByTurfIdAndDate(turfId:string,date:string):Promise<ISlotEntity[]>
    findById(id:string):Promise<ISlotEntity>
    findAll():Promise<ISlotEntity[]>
    update(id:string,updates:object):Promise<ISlotEntity>
    deleteById(id:string):Promise<void>
    findOne(query:object):Promise<ISlotEntity | null>
}