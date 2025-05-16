import { Request,Response } from "express"


export interface IBookingController{
    getAllBooking(req:Request,res:Response):Promise<void>
    joinGame(req:Request,res:Response): Promise<void>
    
}