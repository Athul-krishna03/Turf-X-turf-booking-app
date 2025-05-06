import { IBookingEntity } from "../../models/booking.entity";


export interface IBookingRepository{
    save(data:Partial<IBookingEntity>):Promise<IBookingEntity>;
}