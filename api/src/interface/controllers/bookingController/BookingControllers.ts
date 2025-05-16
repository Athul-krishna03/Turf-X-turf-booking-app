import { Response,Request } from "express";
import { inject, injectable } from "tsyringe";
import { IBookingController } from "../../../entities/controllerInterfaces/booking/IBookingController";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IGetUserBookingDetialsUseCase } from "../../../entities/useCaseInterfaces/user/IGetUserBookingDetialsUseCase";
import { IJoinGameUseCase } from "../../../entities/useCaseInterfaces/booking/IJoinGameUseCase";
import { json } from "stream/consumers";

@injectable()
export  class BookingController implements IBookingController{
    constructor(
        @inject("IGetUserBookingDetialsUseCase") private getUserBookingDetialsUseCase:IGetUserBookingDetialsUseCase,
        @inject("IJoinGameUseCase") private joinGameUseCase:IJoinGameUseCase
    ){}
    async getAllBooking(req:Request,res:Response): Promise<void> {
        try {
            const userId = (req as CustomRequest).user.id
            const bookings = await this.getUserBookingDetialsUseCase.execute(userId);
            console.log(bookings);
            
            if(!bookings){
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success: false,
                    message: "Error in fetching booking detials" 
                })
            }else{
                res.status(HTTP_STATUS.OK).json({
                    success:true,
                    message:"booking detials found",
                    data:bookings
                })
            }
        } catch (error) {
            handleErrorResponse(res,error)
        }        
    }

    async joinGame(req:Request,res:Response): Promise<void>{
        const userId = (req as CustomRequest).user.id;
        const {date,slotId,price} = req.body as {date:string,slotId:string,price:number};
        const data={
            userId,
            date,
            slotId,
            price
        }

        const bookingData = await this.joinGameUseCase.execute(data)
        console.log(bookingData);
        
        if(!bookingData){
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"join the game failed",
            })
            return 
        }

        res.status(HTTP_STATUS.CREATED).json({
            success:true,
            message:"Successfully joined the game",
            bookingData
        })

        return 
    }

    
}