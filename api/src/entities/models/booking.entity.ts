

export interface IBookingEntity {
    id: string;
    bookingId?: string;
    userId: string;
    turfId: string;
    time:string;
    duration: number;
    price: number;
    date: string;
    status:string;
    createdAt: Date;
}

export interface BookingDTO {
    id: string
    turfId: string
    turfName: string
    turfImage: string[]
    location:{
        city:string | undefined,
        state:string | undefined
    }
    date: string
    startTime: string
    duration: number
    price: number
    currency: string
    status: string
    sport: string
}

