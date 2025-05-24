import { BookingDTO } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";

export interface IGetUserBookingDetialsUseCase{
    execute(userId: string): Promise<{
    upcoming: BookingDTO[],
    past: BookingDTO[],
    joinedGames: {
        upcoming: any[],
        past: any[]
    }
    }>
}