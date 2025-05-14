import { inject, injectable } from "tsyringe";
import { IPaymentService } from "../../entities/services/IPaymentService";
import { ISlotService } from "../../entities/services/ISlotService";
import { IBookingSlotUseCase } from "../../entities/useCaseInterfaces/IBookingSlotUseCase";
import { IRedisClient } from "../../entities/services/IRedisClient";


@injectable()
export class SlotBookingService {
constructor(
    @inject("IPaymentService") private paymentService: IPaymentService,
    @inject("ISlotService") private slotService: ISlotService,
    @inject("IBookingSlotUseCase") private bookingUseCase: IBookingSlotUseCase,
    @inject("IRedisClient") private redis:IRedisClient
) {}

async bookSlot(input: {
    userId: string;
    slotId: string;
    price: number;
    duration: number;
    date: string;
    slotLockId: string;
    paymentIntentId: string;
    paymentType: "single" | "shared";
    playerCount?: number;
    }) {
    const {
        userId,
        slotId,
        price,
        duration,
        date,
        slotLockId,
        paymentIntentId,
        paymentType,
        playerCount,
    } = input;

    const isPaymentValid = await this.paymentService.verifyPaymentIntent(paymentIntentId);
    if (!isPaymentValid) {
        throw new Error("Payment not completed");
    }

    const lockKey = `slot_lock:${slotId}`;

    try {
    const slot = await this.slotService.findBySlotId(slotId);
    const turfId = slot.turfId;

    const slots = await this.slotService.validateAndGetSlots(slotId, duration);
    const bookedSlots = await this.slotService.bookSlots(slots);

    const booking = await this.bookingUseCase.execute(
        userId,
        turfId,
        bookedSlots[0].startTime,
        duration,
        price,
        date,
        paymentType,
        playerCount
    );

    return { booking, bookedSlots };
    } finally {
    await this.redis.releaseLock(slotLockId, lockKey);
    }
}
}
