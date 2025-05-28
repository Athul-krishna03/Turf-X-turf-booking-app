import { IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";
import { ITurfEntity } from "../../models/turf.entity";


export interface IGetAllBookingDataUseCase{
    execute(): Promise<{normal:IBookingEntity[],hosted:ISharedBookingEntity[]}>
}