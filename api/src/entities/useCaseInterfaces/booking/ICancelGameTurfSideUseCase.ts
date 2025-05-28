import { IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";

export interface ICancelGameTurfSideUseCase {
    execute(bookingId:string,bookingType:string): Promise<ISharedBookingEntity | IBookingEntity |null>;
}