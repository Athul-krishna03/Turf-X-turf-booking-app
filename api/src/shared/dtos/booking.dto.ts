import { z } from "zod";

export const BookingRequestSchema = z.object({
    isBooked: z.boolean(),
    price: z.number(),
    duration: z.number(),
    slotId: z.string(),
    paymentIntentId: z.string(),
    date: z.string(),
    slotLockId: z.string(),
    paymentType: z.enum(["single", "shared"]),
    playerCount: z.number().optional(),
});

export type BookingRequestDTO = z.infer<typeof BookingRequestSchema>;
