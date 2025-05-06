import { Request, Response } from "express";
import { ISlotController } from "../../../entities/controllerInterfaces/slot/ISlotController";
import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import { addHours, format, parse } from "date-fns";
import Stripe from "stripe";
import { ISlotService } from "../../../entities/services/ISlotService";
import { IBookingSlotUseCase } from "../../../entities/useCaseInterfaces/IBookingSlotUseCase";
import { CustomRequest } from "../../middlewares/authMiddleware";



@injectable()
export class SlotController implements ISlotController {
  constructor(
    @inject("ISlotRepository") private slotRepo: ISlotRepository,
    @inject("ISlotService") private slotService:ISlotService,
    @inject("IBookingSlotUseCase") private bookingSlotUseCase:IBookingSlotUseCase
  ) {}

  async updateSlot(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-04-30.basil",
      });
      const { isBooked, price, duration,slotId,paymentIntentId,date} = req.body as { isBooked: boolean;slotId:string, price: number; duration: number,paymentIntentId:string,date:string};
      console.log("Updating slot:", { slotId, isBooked, duration,date});

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== "succeeded") {
        res.status(400).json({ success: false, message: "Payment not completed" });
        return
      }
      const turfId = (await this.slotRepo.findById(slotId)).turfId
      const slots = await this.slotService.validateAndGetSlots(slotId, duration);
      const bookedSlots = await this.slotService.bookSlots(slots);
      console.log("bookedSlots",bookedSlots);
      const book = await this.bookingSlotUseCase.execute(userId,turfId,bookedSlots,duration,price,date);
      if(!book){
        res.status(400).json({ success: false, message: "Booking not completed" });
        return
      }
      
      res.json({ success: true, bookedSlots });
    } catch (error) {
        console.error("Slot update failed:", error);
        res.status(500).json({ error: "Failed to update slot" });
    }
}
}