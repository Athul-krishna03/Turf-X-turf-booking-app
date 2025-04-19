import { Request, Response } from "express";
import { IUserController } from "../../../entities/controllerInterfaces/user/IUserController";
import { inject, injectable } from "tsyringe";
import { IGetAllUsersUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllUserUseCase";
import { HTTP_STATUS } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";

@injectable()
export class UserController implements IUserController{
    constructor(
        @inject("IGetAllUsersUseCase")
        private getAllUsersUseCase:IGetAllUsersUseCase

    ){}

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const {page=1,limit=10,search=""}=req.query;
            const pageNumber = Number(page);
            const pageSize = Number(limit);
            const searchTermString = typeof search==="string"?search:"";

            const {users,total} = await this.getAllUsersUseCase.execute(
                pageNumber,
                pageSize,
                searchTermString
            );

            res.status(HTTP_STATUS.OK).json({
                success:true,
                users:users,
                totalPages:total,
                currentPage:pageNumber
            })
        } catch (error) {
            handleErrorResponse(res,error)
        }
    }
}