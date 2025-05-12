import { Request,Response } from "express"

export interface ISlotController{
    updateSlot(req:Request,res:Response):Promise<void>
    updateSlotStatus(req:Request,res:Response):Promise<void>
    getSlot(req:Request,res:Response):Promise<void>
}