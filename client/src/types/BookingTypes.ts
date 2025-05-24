import { BookingType } from "./Booking";
import { JoinedGameBooking } from "./joinedGame";


export  type BookingResponse = {
  upcoming: BookingType[];
  past: BookingType[];
  joinedGames:{
    upcoming:JoinedGameBooking[],
    past:JoinedGameBooking[]
  }
};


