

export interface ISharedBookingEntity {
    id: string;
    userIds: any[];
    walletContributions: Map<string, number>;
    walletSum?:number
    turfId: string;
    time:string;
    duration: number;
    price: number;
    date: string;
    status:string;
    playerCount:number;
    createdAt: Date;
}


