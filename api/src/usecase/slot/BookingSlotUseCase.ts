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
    time: string,
    duration: number,
    price: number,
    date: string,
    paymentType:string,
    playerCount:number
  ): Promise<IBookingEntity> {
    try {
      const data = {
        userId,
        turfId,
        time,
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
      }else if(paymentType == "shared"){
        let userIds=[userId]
        let walletContributions = new Map<string, number>();
        walletContributions.set(userId, price);
        price = price * playerCount;
        let data={
            turfId,
            time,
            userIds,
            duration,
            price,
            date,
            paymentType,
            walletContributions: Object.fromEntries(walletContributions),
            status: "Pending",
            playerCount
          }
        const saveData = await this.bookingRepo.saveSharedBooking(data)
        return saveData as IBookingEntity
      }else{
          const saveData = await this.bookingRepo.save(data);
          return saveData as IBookingEntity;
      }
      
    } catch (error) {
      console.error("BookingSlotUseCase failed:", error);
      throw new Error("Failed to save booking");
    }
  }
}
