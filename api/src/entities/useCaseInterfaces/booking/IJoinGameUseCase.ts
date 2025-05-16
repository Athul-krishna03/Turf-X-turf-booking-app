import { ISharedBookingEntity } from "../../models/sharedBooking.entity";

export interface IJoinGameUseCase{
    execute(data: object): Promise<ISharedBookingEntity | null>
}