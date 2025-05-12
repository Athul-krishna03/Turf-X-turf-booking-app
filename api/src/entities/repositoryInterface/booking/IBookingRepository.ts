import { BookingDTO, IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";


export interface IBookingRepository{
    save(data:Partial<IBookingEntity>):Promise<IBookingEntity>;
    getUserBookingDetials(userId:string):Promise<IBookingEntity[]>
    saveSharedBooking(data:Partial<ISharedBookingEntity>):Promise<ISharedBookingEntity | IBookingEntity>;
}