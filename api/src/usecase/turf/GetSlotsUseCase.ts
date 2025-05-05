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
            return slots
        }else{
            return []
        }
    }
}