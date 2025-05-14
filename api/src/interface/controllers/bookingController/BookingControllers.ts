import { Response,Request } from "express";
import { inject, injectable } from "tsyringe";
import { IBookingController } from "../../../entities/controllerInterfaces/booking/IBookingController";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IGetUserBookingDetialsUseCase } from "../../../entities/useCaseInterfaces/user/IGetUserBookingDetialsUseCase";

@injectable()
export  class BookingController implements IBookingController{
    constructor(
        @inject("IGetUserBookingDetialsUseCase") private getUserBookingDetialsUseCase:IGetUserBookingDetialsUseCase
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

  
    
}