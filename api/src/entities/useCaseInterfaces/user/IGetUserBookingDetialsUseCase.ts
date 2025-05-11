import { BookingDTO } from "../../models/booking.entity";

export interface IGetUserBookingDetialsUseCase{
    execute(userId:string):Promise<{ upcoming: BookingDTO[], past: BookingDTO[] }>
}