import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { IGenerateSlotUseCase } from "../../entities/useCaseInterfaces/turf/IGenerateSlotUseCase";
import { ISlotEntity } from "../../entities/models/slot.entity";

@injectable()
export class GenerateSlotUseCase implements IGenerateSlotUseCase{
    constructor(
        @inject("ISlotRepository")
        private SlotRepository:ISlotRepository
    ){}
    async execute(turfId: string, date: string, startTime: string, endTime: string, slotDuration: number): Promise<ISlotEntity[]> {
        const startHour = parseInt(startTime.split(":")[0]);
        const endHour = parseInt(endTime.split(":")[0]);

        const slots:ISlotEntity[]=[];

        for(let hour = startHour;hour<endHour;hour++){
            const slotStart = `${hour.toString().padStart(2,"0")}:00`;
            const slotEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;

            slots.push({
                turfId,
                date,
                startTime: slotStart,
                endTime: slotEnd,
                isBooked:false
            })
        }

        const createdSlots = await this.SlotRepository.createSlots(slots);
        return createdSlots;
    }

}