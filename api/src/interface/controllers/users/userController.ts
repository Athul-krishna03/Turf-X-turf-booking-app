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
import { IUpdateUserPassWordUseCase } from "../../../entities/useCaseInterfaces/user/IUpdateUserPassWordUseCase";
import { IGetUserWalletDetailsUseCase } from "../../../entities/useCaseInterfaces/user/IGetUserWalletDetailsUseCase";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject("IGetAllUsersUseCase")
    private _getAllUsersUseCase: IGetAllUsersUseCase,
    @inject("IUpdateUserStatusUseCase")
    private _updateUser: IUpdateUserStatusUseCase,
    @inject("IUpdateProfileUsecase")
    private _updateUserProfile: IUpdateProfileUseCase,
    @inject("IUpdateUserPassWordUseCase")
    private _updateUserPassWordUseCase:IUpdateUserPassWordUseCase,
    @inject("IGetUserWalletDetailsUseCase")
    private _getUserWalletDetailsUseCase: IGetUserWalletDetailsUseCase
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;
      const pageNumber = Number(page);
      const pageSize = Number(limit);
      const searchTermString = typeof search === "string" ? search : "";

      const { users, total } = await this._getAllUsersUseCase.execute(
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

      await this._updateUser.execute(userId);
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
        "email",
        "profileImage",
        "walletBalance",
        "position",
      ];
      allowedField.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
      console.log("data in controller",req.body)
      const updateUser = await this._updateUserProfile.execute(
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

  //Update user Password
  async updateUserPassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;

      const {currPass , newPass} = req.body as {
        currPass:string,
        newPass:string
      }
      console.log("change pass body data",req.body);
      
      console.log("curr",currPass,"new",newPass);
      await this._updateUserPassWordUseCase.execute(userId,currPass,newPass)
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.UPDATE_SUCCESS
      })
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  async getWalletDetails(req: Request,res: Response): Promise<void> {
    try {
      const userId = (req as CustomRequest).user.id;
      const walletDetails = await this._getUserWalletDetailsUseCase.execute(userId);
      if (!walletDetails) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: "Wallet details not found",
        });
        return;
      }else{
        res.status(HTTP_STATUS.OK).json({
        success: true,
        data: walletDetails,
        });
        return
      }
      
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
