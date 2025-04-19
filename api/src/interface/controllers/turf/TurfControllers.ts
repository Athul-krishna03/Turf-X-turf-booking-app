import { Request, Response } from "express";
import { ITurfControllers } from "../../../entities/controllerInterfaces/turf/ITurfControllers";
import { inject, injectable } from "tsyringe";
import { IGetAllTurfUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllTurfsUseCase";
import { HTTP_STATUS } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";

@injectable()
export class TurfControllers implements ITurfControllers{
    constructor(
        @inject("IGetAllTurfUseCase")
        private getAllTurfsUseCase:IGetAllTurfUseCase
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
}