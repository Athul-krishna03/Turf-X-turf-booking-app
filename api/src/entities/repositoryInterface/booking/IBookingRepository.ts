import { IHostedGame } from "../../../shared/dtos/hostGame.dto";
import { BookingDTO, IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";


export interface IBookingRepository{
    save(data:Partial<IBookingEntity>):Promise<IBookingEntity>;
    getUserBookingDetials(userId:string):Promise<IBookingEntity[]>
    find(userId:string):Promise<IHostedGame[]>
    saveSharedBooking(data:Partial<ISharedBookingEntity>):Promise<ISharedBookingEntity | IBookingEntity>;
}    