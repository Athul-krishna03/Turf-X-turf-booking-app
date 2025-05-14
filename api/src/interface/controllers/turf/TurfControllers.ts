import { Request, Response } from "express";
import { ITurfControllers } from "../../../entities/controllerInterfaces/turf/ITurfControllers";
import { inject, injectable } from "tsyringe";
import { IGetAllTurfUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllTurfsUseCase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IUpdateTurfStatusUseCase } from "../../../entities/useCaseInterfaces/admin/IUpdateTurfStatusUseCase";
import { IGetAllTurfRequestsUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllTurfRequestsUsecase";
import { IUpdateTurfRequestUseCase } from "../../../entities/useCaseInterfaces/admin/IUpdateTurfRequestUseCase";
import { IGenerateSlotUseCase } from "../../../entities/useCaseInterfaces/turf/IGenerateSlotUseCase";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { ITurfEntity } from "../../../entities/models/turf.entity";
import { IUpdateTurfProfileUseCase } from "../../../entities/useCaseInterfaces/turf/IUpdateTurfProfileUseCase";
import { IUpdateTurfPassWordUseCase } from "../../../entities/useCaseInterfaces/turf/IUpdateTurfPasswordUseCase";
import { IGetSlotUseCase } from "../../../entities/useCaseInterfaces/turf/IGetSlotUseCase";
import { IGetAllHostedGamesUseCase } from "../../../entities/useCaseInterfaces/turf/IGetAllHostedGamesUseCase";

@injectable()
export class TurfControllers implements ITurfControllers{
    constructor(
        @inject("IGetAllTurfUseCase")
        private getAllTurfsUseCase:IGetAllTurfUseCase,
        @inject("IGetAllTurfRequestsUseCase")
        private getAllTurfRequestsUseCase:IGetAllTurfRequestsUseCase,
        @inject("IUpdateTurfStatusUseCase")
        private updateTurf:IUpdateTurfStatusUseCase,
        @inject("IUpdateTurfRequestUseCase")
        private updateTurfRequest:IUpdateTurfRequestUseCase,
        @inject("IGenerateSlotUseCase")
        private generateSlot:IGenerateSlotUseCase,
        @inject("IUpdateTurfProfileUseCase")
        private updateUserProfile:IUpdateTurfProfileUseCase,
        @inject("IUpdateTurfPassWordUseCase")
        private updateTurfPassWordUseCase:IUpdateTurfPassWordUseCase,
        @inject("IGetSlotsUseCase")
        private fetchSlots:IGetSlotUseCase,
        @inject("IGetAllHostedGamesUseCase")
        private getAllHostedGamesUseCase:IGetAllHostedGamesUseCase
    ){}
    async getAllTurfs(req: Request, res: Response): Promise<void> {
        try {
            const {page=1,limit=10,search=""}=req.query;
            const pageNumber = Number(page);
            const pageSize = Number(limit);
            const searchTermString = typeof search==="string"?search:"";

            const {turfs,total} = await this.getAllTurfsUseCase.execute(
                pageNumber,
                pageSize,
                searchTermString
            );

            res.status(HTTP_STATUS.OK).json({
                success:true,
                turfs:turfs,
                totalPages:total,
                currentPage:pageNumber

            })
        } catch (error) {
            handleErrorResponse(res,error)
        }
        
    }
    async updateTurfStatus(req: Request, res: Response): Promise<void> {
            try {
                const {turfId} = req.params;
                console.log("turf id",turfId);
                
                await this.updateTurf.execute(turfId);
                res.status(HTTP_STATUS.OK).json({
                    success:true,
                    message:SUCCESS_MESSAGES.UPDATE_SUCCESS
                });
    
            } catch (error) {
                handleErrorResponse(res,error)
            }
        }
        async getAllTurfRequest(req: Request, res: Response): Promise<void> {
            try {
                const {page=1,limit=10,search=""}=req.query;
                const pageNumber = Number(page);
                const pageSize = Number(limit);
                const searchTermString = typeof search==="string"?search:"";
    
                const {turfs,total} = await this.getAllTurfRequestsUseCase.execute(
                    pageNumber,
                    pageSize,
                    searchTermString
                );
    
                res.status(HTTP_STATUS.OK).json({
                    success:true,
                    turfs:turfs,
                    totalPages:total,
                    currentPage:pageNumber
    
                })
            } catch (error) {
                handleErrorResponse(res,error)
            }
            
        }
        async updateTurfRequestStatus(req: Request, res: Response): Promise<void> {
            try {
                const {status,reason} = req.body;
                const {turfId} = req.params;
                console.log("status",status)
                console.log("turf id",turfId);
                
                await this.updateTurfRequest.execute(turfId,status,reason);
                res.status(HTTP_STATUS.OK).json({
                    success:true,
                    message:SUCCESS_MESSAGES.UPDATE_SUCCESS
                });
    
            } catch (error) {
                handleErrorResponse(res,error)
            }
        }

        //generate slots

        async generateSlots(req: Request, res: Response): Promise<void> {
            try {
                console.log("genrate body",req.body);
                
                const {turfId,date,startTime,endTime,slotDuration,price,selectedDate,endDate}=req.body;
                
                const slots = await this.generateSlot.execute(
                    turfId,
                    date,
                    selectedDate,
                    endDate,
                    startTime,
                    endTime,
                    slotDuration,
                    price,
                )
                res.status(201).json({ message: "Slots generated successfully", slots });

            } catch (error) {
                console.log(error);
                handleErrorResponse(res,error)
            }
        }

        //Edit the turf profile


        async editTurf(req: Request, res: Response): Promise<void> {
            try {
                console.log("hii");
                
                const turfId = (req as CustomRequest).user.id;
                console.log("turf id",turfId);
                
                const updateData:Partial<ITurfEntity>={};
                const allowedField:(keyof ITurfEntity)[]=[
                    "name",
                    'email',
                    "aminities",
                    "location",
                    'turfPhotos',
                    'phone'

                ]
                allowedField.forEach((field)=>{
                    if(req.body[field] !== undefined){
                        updateData[field] = req.body[field]
                    }
                });
                console.log("data in edit turf",req.body);
                const updateTurf = await this.updateUserProfile.execute(
                    turfId,
                    updateData
                )
                console.log("update turf data",updateTurf);
                
                res.status(HTTP_STATUS.OK).json({
                    success: true,
                    message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
                    data: updateTurf,
                });
            } catch (error) {
                handleErrorResponse(res,error)
            }
        }

        async updateTurfPassword(req: Request, res: Response): Promise<void> {
            try {
            const userId = (req as CustomRequest).user.id;
        
            const {currPass , newPass} = req.body as {
                currPass:string,
                newPass:string
            }
            console.log("change pass body data",req.body);
            console.log("curr",currPass,"new",newPass);
            await this.updateTurfPassWordUseCase.execute(userId,currPass,newPass)
            
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.UPDATE_SUCCESS
            })
            } catch (error) {
            handleErrorResponse(res, error);
            }
        }

        //GET SLOTS PER DATE

        async getSlots(req: Request, res: Response): Promise<void> {
            try {
                console.log("slotsss");
                
                const { turfId, date } = req.query as { turfId: string; date: string };
                console.log(turfId,date);
                
                const slots = await this.fetchSlots.execute(turfId, date);
                console.log("slots",slots);
                
                res.status(200).json({
                    success: true,
                    data: slots,
                }
                );
            } catch (error) {
                console.error('Error fetching slots:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }

        async getAllHostedGames(req: Request, res: Response): Promise<void> {
            const userId = (req as CustomRequest).user.id
            const games=await this.getAllHostedGamesUseCase.execute(userId);
            if(!games){
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success:false,
                    message:"failed to fetch the data"
                })
                return 
            }

            res.status(HTTP_STATUS.OK).json({
                success:true,
                message:SUCCESS_MESSAGES.DATA_RETRIEVED,
                games
            })
        }
}