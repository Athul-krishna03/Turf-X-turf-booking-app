import { Request, Response } from "express";
import { ITurfControllers } from "../../../entities/controllerInterfaces/turf/ITurfControllers";
import { inject, injectable } from "tsyringe";
import { IGetAllTurfUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllTurfsUseCase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IUpdateTurfStatusUseCase } from "../../../entities/useCaseInterfaces/admin/IUpdateTurfStatusUseCase";
import { IGetAllTurfRequestsUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllTurfRequestsUsecase";
import { IUpdateTurfRequestUseCase } from "../../../entities/useCaseInterfaces/admin/IUpdateTurfRequestUseCase";

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
        private updateTurfRequest:IUpdateTurfRequestUseCase
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
}