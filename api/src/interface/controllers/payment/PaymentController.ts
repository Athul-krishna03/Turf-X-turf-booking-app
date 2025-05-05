import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import Stripe from "stripe";
import { config } from "../../../shared/config";
import { IPaymentControllers } from "../../../entities/controllerInterfaces/Payment/IPaymentControllers";
import { Request, Response } from "express";




@injectable()
export  class PaymentController implements IPaymentControllers{
    private stripe:Stripe;
    constructor(
        @inject("ISlotRepository") private slotRepo:ISlotRepository
    ){
        this.stripe = new Stripe(config.stripe,{
            apiVersion:"2025-04-30.basil"
        })
    }
    async createPaymentIntent(req: Request, res: Response): Promise<void> {
        try {
            const {slotId,price} = req.body as {slotId:string,price:number};

            const slot  = await this.slotRepo.findById(slotId);

            if(!slot){
                res.status(404).json({error:"Slot not found"});
                return;
            }
            if(slot.isBooked){
                res.status(400).json({error:"SLot already booked"});
                return ;
            }
            
            const paymentIntent = await this.stripe.paymentIntents.create({
            amount: price * 100,
            currency: "inr",
            metadata: { slotId: slotId },
            automatic_payment_methods: { enabled: true },
            });
            console.log("payment intent",paymentIntent);
            
            res.json({clientSecret:paymentIntent.client_secret});
        } catch (error) {
            console.error("PaymentIntent creation failed:", error);
            res.status(500).json({ error: "Failed to create payment" });
        }
    }
}