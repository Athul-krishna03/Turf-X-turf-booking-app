import { Request,Response } from "express"


export interface IBookingController{
    getAllBooking(req:Request,res:Response):Promise<void>
    joinGame(req:Request,res:Response): Promise<void>
    getAllBookingData(req:Request, res:Response):Promise<void>
    getJoinedGameDetials(req:Request,res:Response):Promise<void>
    normalGameCancel(req:Request,res:Response):Promise<void>
    cancelJoinedGame(req:Request,res:Response):Promise<void>
    cancelBookingTurfOWner(req:Request,res:Response):Promise<void>
}