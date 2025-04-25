import { Request, Response } from "express";
import { IUserController } from "../../../entities/controllerInterfaces/user/IUserController";
import { inject, injectable } from "tsyringe";
import { IGetAllUsersUseCase } from "../../../entities/useCaseInterfaces/admin/IGetAllUserUseCase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { IUpdateUserStatusUseCase } from "../../../entities/useCaseInterfaces/admin/IUpdateUserStatusUseCase";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { IClientEntity } from "../../../entities/models/client.entity";
import { IUpdateProfileUseCase } from "../../../entities/useCaseInterfaces/user/IUpdateProfileUseCase";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject("IGetAllUsersUseCase")
    private getAllUsersUseCase: IGetAllUsersUseCase,
    @inject("IUpdateUserStatusUseCase")
    private updateUser: IUpdateUserStatusUseCase,
    @inject("IUpdateProfileUsecase")
    private updateUserProfile: IUpdateProfileUseCase
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const pageNumber = Number(page);
      const pageSize = Number(limit);
      const searchTermString = typeof search === "string" ? search : "";

      const { users, total } = await this.getAllUsersUseCase.execute(
        pageNumber,
        pageSize,
        searchTermString
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        users: users,
        totalPages: total,
        currentPage: pageNumber,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
  // USER UPDATE STATUS
  async updateUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      await this.updateUser.execute(userId);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
  // EDIT USER CONTROLLER

  async editUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;
      const updateData: Partial<IClientEntity> = {};
      const allowedField: (keyof IClientEntity)[] = [
        "name",
        "phone",
        "profileImage",
        "position",
      ];
      allowedField.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
      console.log("data in controller",req.body)
      const updateUser = await this.updateUserProfile.execute(
        userId,
        updateData
      );
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
        data: updateUser,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
