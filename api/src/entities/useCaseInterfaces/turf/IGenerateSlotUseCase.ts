import { ISlotEntity } from "../../models/slot.entity";

export interface IGenerateSlotUseCase{
    execute(turfId:string,date:string,startTime:string,endTime:string,slotDuration:number):Promise<ISlotEntity[]>
}