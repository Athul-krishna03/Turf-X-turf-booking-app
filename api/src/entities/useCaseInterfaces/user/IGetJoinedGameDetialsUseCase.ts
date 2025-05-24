import { ISharedBookingEntity } from "../../models/sharedBooking.entity";
import { ITurfEntity } from "../../models/turf.entity";

export interface IGetJoinedGameDetialsUseCase{
    execute(bookingId: string): Promise<{booking: ISharedBookingEntity; turf: ITurfEntity | null;}>
}