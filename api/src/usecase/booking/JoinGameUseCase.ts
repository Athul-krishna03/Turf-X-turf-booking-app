import { inject, injectable } from "tsyringe";
import { IJoinGameUseCase } from "../../entities/useCaseInterfaces/booking/IJoinGameUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";

@injectable()
export class JoinGameUseCase implements IJoinGameUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo: IBookingRepository
    ){}
    async execute(data: object): Promise< ISharedBookingEntity | null> {
        
        try {
            const booking = await this._bookingRepo.joinGame(data);
            if (booking && booking.userIds.length === booking.playerCount) {
                await this._bookingRepo.updateJoinedGameBookingStatus(booking.id, {
                    isSlotLocked:true,
                    status: "Booked"
                });
            }
            if (!booking) {
                throw new Error("Booking not found or already confirmed");
            }
            return booking;
        } catch (error:any) {
            console.error("JoinGameUseCase failed:", error);
            throw error;
        }
        
    }
}