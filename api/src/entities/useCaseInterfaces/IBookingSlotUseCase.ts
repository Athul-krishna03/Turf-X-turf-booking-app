import { IBookingEntity } from "../models/booking.entity";

export interface IBookingSlotUseCase{
    execute(userId:string,turfId: string,slotIds: string ,duration: number,price: number,date:string,paymentType:string,playerCount?:number):Promise<IBookingEntity>
}