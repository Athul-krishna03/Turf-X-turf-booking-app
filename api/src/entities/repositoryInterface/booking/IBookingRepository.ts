import { IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";


export interface IBookingRepository{
    save(data:Partial<IBookingEntity>):Promise<IBookingEntity>;
    findById(id: string): Promise<ISharedBookingEntity>
    getAllBooking():Promise<IBookingEntity[]>;
    getUserBookingDetials(userId:string):Promise<IBookingEntity[]>
    find():Promise<ISharedBookingEntity[]>
    saveSharedBooking(data:Partial<ISharedBookingEntity>):Promise<ISharedBookingEntity | IBookingEntity>;
    joinGame(data:object):Promise<ISharedBookingEntity | null>
    cancelNormalGame(bookingId: string): Promise<IBookingEntity | null>
    // cancelGame(data:{bookingId:string,userId:string,isHost:boolean}):Promise<ISharedBookingEntity | null>
}    