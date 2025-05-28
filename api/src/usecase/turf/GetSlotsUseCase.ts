import { inject, injectable } from "tsyringe";
import { ISlotEntity } from "../../entities/models/slot.entity";
import { IGetSlotUseCase } from "../../entities/useCaseInterfaces/turf/IGetSlotUseCase";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";


@injectable()
export class GetSlotUseCase implements IGetSlotUseCase{
    constructor(
        @inject("ISlotRepository")
        private SlotRepository:ISlotRepository
    ){}
    async execute(turfId: string, date: string): Promise<ISlotEntity[]> {
        
        const slots = await this.SlotRepository.findByTurfIdAndDate(turfId,date);
        if(slots){
            const currentTime = new Date();
            console.log("currentTime",currentTime);
            
            const filteredSlots = slots.filter(slot => {
                const slotDateTime = new Date(`${date}T${slot.startTime}`);
                console.log("slotDatetime", slotDateTime);
                return slotDateTime > currentTime;
            });
            return filteredSlots;
        }else{
            return []
        }
    }
}