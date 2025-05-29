import { inject, injectable } from "tsyringe";
import { ISlotRepository } from "../../../entities/repositoryInterface/turf/ISlotRepository";
import Stripe from "stripe";
import { config } from "../../../shared/config";
import { IPaymentControllers } from "../../../entities/controllerInterfaces/Payment/IPaymentControllers";
import { Request, Response } from "express";
import { IRedisClient } from "../../../entities/services/IRedisClient";
import { IPaymentService } from "../../../entities/services/IPaymentService";




@injectable()
export  class PaymentController implements IPaymentControllers{
    private stripe:Stripe;
    constructor(
        @inject("ISlotRepository") private _slotRepo:ISlotRepository,
        @inject("IRedisClient") private _redis:IRedisClient,
        @inject("IPaymentService") private _paymentService:IPaymentService
    ){
        this.stripe = new Stripe(config.stripe,{
            apiVersion:"2025-04-30.basil"
        })
    }
    async createPaymentIntent(req: Request, res: Response): Promise<void> {
        try {
            const {slotId,price} = req.body as {slotId:string,price:number};
            if(!slotId){
                const paymentIntent = await this._paymentService.createPaymentIntent(
                    price
                )

                res.json({ clientSecret: paymentIntent.clientSecret});
                return
            }
            const lockKey = `slot_lock:${slotId}`;

            const slot  = await this._slotRepo.findById(slotId);

            if(!slot){
                res.status(404).json({error:"Slot not found"});
                return;
            }

            const lockId = await this._redis.acquireLock(lockKey,30000);
            console.log("lockid ",lockId);

            if(!lockId){
                res.status(400).json({error:"Slot is unavilable"})
                return
            }
            
            if(slot.isBooked){
                await this._redis.releaseLock(lockKey,lockId);
                res.status(400).json({error:"Slot already booked"});
                return ;
            }
            try {
                const paymentIntent = await this._paymentService.createPaymentIntent(
                    price,slotId,
                )

                res.json({ clientSecret: paymentIntent.clientSecret, lockId });
                return 
            } catch (err) {
                if (lockId) {
                    await this._redis.releaseLock(lockKey,lockId);
                }
                console.error("PaymentIntent creation failed:", err);
                res.status(500).json({ error: "Failed to create payment" });
                return
            }
        } catch (error) {
            console.error("PaymentIntent creation failed:", error);
            res.status(500).json({ error: "Failed to create payment" });
        }
    }
}