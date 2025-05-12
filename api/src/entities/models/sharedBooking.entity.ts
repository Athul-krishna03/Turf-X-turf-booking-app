import { ISlotEntity } from "./slot.entity";

export interface ISharedBookingEntity {
    id: string;
    userIds: string[];
    wallet:number;
    turfId: string;
    slotIds: ISlotEntity[];
    duration: number;
    price: number;
    date: string;
    status:string;
    createdAt: Date;
}