import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { IBlackListTokenUseCase } from "../../entities/repositoryInterface/auth/IBlackListTokenUseCase";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/IRevokeRefreshTokenUseCase";
import { CustomRequest } from "./authMiddleware";
import { NextFunction, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { clearAuthCookies } from "../../shared/utils/cookieHelper";


@injectable()
export class BlockStatusMiddleware {
  constructor(
    @inject("IClientRepository")
    private readonly clientRepository: IClientRepository,
    @inject("IBlackListTokenUseCase")
    private readonly blacklistTokenUseCase: IBlackListTokenUseCase,
    @inject("IRevokeRefreshTokenUseCase")
    private readonly revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase
  ) {}
  checkStatus = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized:No user found in request",
        });
        return;
      }

      const { id, role } = req.user;
      let status: Boolean = false;
      if (role === "user") {
        const user = await this.clientRepository.findById(id);
        if (!user) {
          res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: ERROR_MESSAGES.USER_NOT_FOUND,
          });
          return;
        }
        status = user.isBlocked;
      }
      if (status) {
        await this.blacklistTokenUseCase.execute(req.user.access_token);

        await this.revokeRefreshTokenUseCase.execute(req.user.refresh_token);

        const accessTokenName = `${role}_access_token`;
        const refreshTokenName = `${role}_refresh_token`;

        clearAuthCookies(res, accessTokenName, refreshTokenName);
        res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: "Access denied:Your account has been blocked",
        });
        return;
      }
      next();
    } catch (error) {
        console.log("BlocekdStatus MiddleWare has an Error",error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Internal Server Error while checking blocked status"
        })
        return 
    }
  };
}
