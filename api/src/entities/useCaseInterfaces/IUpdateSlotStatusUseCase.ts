import { ISlot } from "../../usecase/turf/GenerateSlotsUseCase";

export interface IUpdateSlotStatusUseCase{
    execute(slotId:string):Promise<ISlot| null>
}