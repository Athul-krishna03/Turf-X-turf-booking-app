import { Response,Request } from "express";
import { inject, injectable } from "tsyringe";
import { IBookingController } from "../../../entities/controllerInterfaces/booking/IBookingController";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IGetUserBookingDetialsUseCase } from "../../../entities/useCaseInterfaces/user/IGetUserBookingDetialsUseCase";
import { IJoinGameUseCase } from "../../../entities/useCaseInterfaces/booking/IJoinGameUseCase";
import { IGetAllBookingDataUseCase } from "../../../entities/useCaseInterfaces/turf/IGetAllBookingDataUseCase";
import { IGetJoinedGameDetialsUseCase } from "../../../entities/useCaseInterfaces/user/IGetJoinedGameDetialsUseCase";
import { INormalGameCancelUseCase } from "../../../entities/useCaseInterfaces/booking/INormalGameCancelUseCase";
import { IUpdateSlotStatusUseCase } from "../../../entities/useCaseInterfaces/IUpdateSlotStatusUseCase";

@injectable()
export  class BookingController implements IBookingController{
    constructor(
        @inject("IGetUserBookingDetialsUseCase") private _getUserBookingDetialsUseCase:IGetUserBookingDetialsUseCase,
        @inject("IJoinGameUseCase") private _joinGameUseCase:IJoinGameUseCase,
        @inject("IGetAllBookingDataUseCase") private _getAllBookingUseCase:IGetAllBookingDataUseCase,
        @inject("IGetJoinedGameDetialsUseCase") private _joinedGameDetials:IGetJoinedGameDetialsUseCase,
        @inject("INormalGameCancelUseCase") private _normalGameCancel:INormalGameCancelUseCase,
        @inject("IUpdateSlotStatusUseCase") private _updateSlotStatus:IUpdateSlotStatusUseCase
    ){}
    async getAllBooking(req:Request,res:Response): Promise<void> {
        try {
            const userId = (req as CustomRequest).user.id
            const bookings = await this._getUserBookingDetialsUseCase.execute(userId);
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

        const bookingData = await this._joinGameUseCase.execute(data)
        console.log(bookingData);
        
        if(!bookingData){
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"join the game failed",
            })
            return 
        }

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Successfully joined the game",
            bookingData
        })

        return 
    }
    async getAllBookingData(req:Request, res:Response):Promise<void>{
        const data = await this._getAllBookingUseCase.execute();
        if(data){
            res.status(HTTP_STATUS.OK).json({
                success:true,
                data
            })
            return 
        }else{
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:"join the game failed",
            })
            return 
        }
    }

    async getJoinedGameDetials(req:Request,res:Response):Promise<void>{
        const { bookingId } = req.query as {bookingId:string}
        const joinedGameDetials = await this._joinedGameDetials.execute(bookingId);
        if(!joinedGameDetials){
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success:false,
                message:SUCCESS_MESSAGES.FAILED_DATA_FETCH
            })
            return 
        }else{
            res.status(HTTP_STATUS.OK).json({
                success:true,
                joinedGameDetials
            })
        }
    }
    
    async normalGameCancel(req:Request,res:Response):Promise<void>{
        const {bookingId,bookingType} = req.body as {bookingId:string,bookingType:string};
        
        const result = await this._normalGameCancel.execute(bookingId);
        if(result){
            const updateSlotStatus = await this._updateSlotStatus.execute(result.)
        
        }
    }
}