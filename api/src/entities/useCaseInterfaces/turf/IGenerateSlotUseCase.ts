import { ISlot } from "../../../usecase/turf/GenerateSlotsUseCase";


export interface IGenerateSlotUseCase{
    execute(turfId:string,date:string,selectedDate:string,endDate:string,startTime:string,endTime:string,slotDuration:number,price:number):Promise<ISlot[]>
}