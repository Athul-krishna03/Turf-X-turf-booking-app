import { inject, injectable } from "tsyringe";
import { IBookingEntity } from "../entities/models/booking.entity";
import { IBookingRepository } from "../entities/repositoryInterface/booking/IBookingRepository";
import { IBookingSlotUseCase } from "../entities/useCaseInterfaces/IBookingSlotUseCase";

@injectable()
export class BookingSlotUseCase implements IBookingSlotUseCase {
constructor(
    @inject("IBookingRepository") private bookingRepo: IBookingRepository
) {}

async execute(
    userId: string,
    turfId: string,
    slotIds: Object[],
    duration: number,
    price: number,
    date: string,

): Promise<IBookingEntity> {
    try {
    const data = {
        userId,
        turfId,
        slotIds,
        duration,
        price,
        date,
        status: "Booked"
    };
    console.log("data inside usecase",data)
    const saveData = await this.bookingRepo.save(data);
    return saveData as IBookingEntity;
    } catch (error) {
        console.error("BookingSlotUseCase failed:", error);
        throw new Error("Failed to save booking");
    }
}
}
