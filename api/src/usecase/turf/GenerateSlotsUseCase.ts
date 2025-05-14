import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { IGenerateSlotUseCase } from "../../entities/useCaseInterfaces/turf/IGenerateSlotUseCase";
import { addDays, format } from "date-fns";
import { ISlotEntity } from "../../entities/models/slot.entity";

export interface ISlot{
    turfId:string,
    date:string,
    duration:number,
    price:number,
    startTime:string,
    endTime:string,
    isBooked?:boolean

}

@injectable()
export class GenerateSlotUseCase implements IGenerateSlotUseCase {
constructor(
    @inject("ISlotRepository")
    private SlotRepository: ISlotRepository
) {}

async execute(
    turfId: string,
    date: string,
    selectedDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    slotDuration: number,
    price: number
    ): Promise<ISlot[]> {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);

    const generatedSlots: ISlot[] = [];

    const generateSlotsForDate = (targetDate: string) => {
        for (let hour = startHour; hour < endHour; hour++) {
        const slotStart = `${hour.toString().padStart(2, "0")}:00`;
        const slotEnd = `${(hour + 1).toString().padStart(2, "0")}:00`;

        generatedSlots.push({
            turfId,
            date: targetDate,
            duration: slotDuration,
            price,
            startTime: slotStart,
            endTime: slotEnd,
            isBooked: false,
        });
    }
    };
    const start = new Date(selectedDate);
    const end = new Date(endDate);

    if (selectedDate && endDate && selectedDate !== endDate) {
      const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        for (let i = 0; i <= daysDiff; i++) {
        const currentDate = format(addDays(start, i), "yyyy-MM-dd");
        generateSlotsForDate(currentDate);
    }
    } else {
        generateSlotsForDate(date);
    }

    const createdSlots = await this.SlotRepository.createSlots(generatedSlots);
    return createdSlots;
    }
}