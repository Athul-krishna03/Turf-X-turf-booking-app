
export interface IBookingEntity {
    id: string;
    userId: string;
    turfId: string;
    slotIds: Object[]; 
    duration: number;
    price: number;
    date: string;
    status:string;
    createdAt: Date;
}
