import { BookingType } from "./Booking";


export interface JoinedGameBooking extends BookingType {
  joinedUsers: {
    _id: any;
    id: string;
    name: string;
    email: string;
    profileImage?: string;
  }[];
  playerCount: number;
  walletBalance: number;
}
