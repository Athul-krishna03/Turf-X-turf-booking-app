import { IBookingEntity } from "../models/booking.entity";

export interface IBookingSlotUseCase{
    execute(userId:string,turfId: string,slotIds: Object[] ,duration: number,price: number,date:string):Promise<IBookingEntity>
}