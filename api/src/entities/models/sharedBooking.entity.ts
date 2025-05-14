import { UserDTO } from "../../shared/dtos/user.dto";
import { ISlotEntity } from "./slot.entity";

export interface ISharedBookingEntity {
    id: string;
    userIds: any[];
    wallet:number;
    turfId: string;
    time:string;
    duration: number;
    price: number;
    date: string;
    status:string;
    playerCount:number;
    createdAt: Date;
}