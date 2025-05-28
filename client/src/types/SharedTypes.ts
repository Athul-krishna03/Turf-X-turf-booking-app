

export interface ISharedBookingEntity {
    id: string;
    userIds: any[];
    bookingId?: string;
    walletContributions: Map<string, number>;
    walletSum?:number
    turfId: string;
    time:string;
    duration: number;
    price: number;
    date: string;
    status:string;
    cancelledUsers?: string[];
    refundsIssued?: Map<string, number>;
    isSlotLocked: boolean;
    playerCount:number;
    createdAt: Date;
}


