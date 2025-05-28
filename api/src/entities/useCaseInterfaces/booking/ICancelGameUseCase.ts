import { ISharedBookingEntity } from "../../models/sharedBooking.entity";


export interface ICancelGameUseCase {
    execute(data: {bookingId: string;userId: string;isHost: boolean;}): Promise<ISharedBookingEntity | null>
}