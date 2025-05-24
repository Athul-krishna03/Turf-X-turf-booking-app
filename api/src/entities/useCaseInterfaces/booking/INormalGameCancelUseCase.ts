import { IBookingEntity } from "../../models/booking.entity";

export interface INormalGameCancelUseCase{
    execute(bookingId: string): Promise<IBookingEntity | null> 
}