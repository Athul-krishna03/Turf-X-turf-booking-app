import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { ISlotEntity } from "../../entities/models/slot.entity";
import {parse,addHours,isBefore, addMinutes} from 'date-fns'
import { IDeleteExpiredSlotsUseCase } from "../../entities/useCaseInterfaces/IDeleteExpiredSlotsUseCase";

@injectable()
export class DeleteExpiredSlotsUseCase implements IDeleteExpiredSlotsUseCase {
    constructor(
        @inject("ISlotRepository")
        private slotRepo:ISlotRepository
    ){}
    
    async execute(): Promise<void> {
        const now = new Date();
        const slots = await this.slotRepo.findAll();
    
        const deletionPromises = slots.map(async (slot) => {
        const slotDateTimeStr = `${slot.date} ${slot.startTime}`;
        const slotStart = parse(slotDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
        const slotEnd = addMinutes(slotStart, slot.duration);
    
        console.log("slot end",slotEnd,now);
        
        if (isNaN(slotStart.getTime())) {
            console.error(`Invalid date parsed for slot: ${slot.id}, date: ${slotDateTimeStr}`);
            return;
        }
        if (isBefore(slotEnd, now)) {
            if(slot.id){
                await this.slotRepo.deleteById(slot.id);
                console.log(`Deleted expired slot: Turf ${slot.id}, Date ${slot.date}, Start ${slot.startTime}`);
            }else{
                console.log("missing id of the turf to clean up");
                
            }
            
        }
        });
    
        await Promise.all(deletionPromises);
    }


}