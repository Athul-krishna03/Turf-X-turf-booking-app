export interface BookingType {
    id: string;
    turfId: string;
    turfName: string;
    turfImage: string[];
    location: {
        city: string;
        state: string;
    };
    currency: string;      // e.g., "₹"
    date: string;          // ISO string: "2025-05-23T18:30:00.000Z"
    duration: number;      // in hours
    startTime: string;     // e.g., "17:00"
    status: "Pending" | "Booked" | "Cancelled" | "Confirmed";
    price: number;         // total price
    sport: string;
}
