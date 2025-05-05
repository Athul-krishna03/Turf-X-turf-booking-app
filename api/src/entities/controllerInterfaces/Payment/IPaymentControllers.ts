import { Request,Response } from "express"

export interface IPaymentControllers{
    createPaymentIntent(req:Request,res:Response):Promise<void>
}