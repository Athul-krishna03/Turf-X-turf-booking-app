import { inject, injectable } from "tsyringe";
import { IBookingEntity } from "../../entities/models/booking.entity";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { IBookingSlotUseCase } from "../../entities/useCaseInterfaces/IBookingSlotUseCase";
import { ISlotEntity } from "../../entities/models/slot.entity";

@injectable()
export class BookingSlotUseCase implements IBookingSlotUseCase {
  constructor(
    @inject("IBookingRepository") private bookingRepo: IBookingRepository
  ) {}
  async execute(
    userId: string,
    turfId: string,
    slotIds: ISlotEntity[],
    duration: number,
    price: number,
    date: string,
    paymentType:string
  ): Promise<IBookingEntity> {
    try {
      const data = {
        userId,
        turfId,
        slotIds,
        duration,
        price,
        date,
        paymentType,
        status: "Booked",
      };
      console.log("data inside usecase", data);
      if(paymentType == "single"){
        const saveData = await this.bookingRepo.save(data);
        return saveData as IBookingEntity;
      }
      if(paymentType == "shared"){
        let userIds=[userId]
        let data={
            turfId,
            slotIds,
            userIds,
            duration,
            price,
            date,
            paymentType,
            status: "Booked",
          }
        const saveData = await this.bookingRepo.saveSharedBooking(data)
        return saveData as IBookingEntity
      }
      const saveData = await this.bookingRepo.save(data);
      return saveData as IBookingEntity;
    } catch (error) {
      console.error("BookingSlotUseCase failed:", error);
      throw new Error("Failed to save booking");
    }
  }
}
