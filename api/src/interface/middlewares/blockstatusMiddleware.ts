import { inject, injectable } from "tsyringe";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/IRevokeRefreshTokenUseCase";
import { IBlackListTokenUseCase } from "../../entities/repositoryInterface/auth/IBlackListTokenUseCase";
import { NextFunction, Response } from "express";
import { CustomRequest } from "./authMiddleware";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { clearAuthCookies } from "../../shared/utils/cookieHelper";

@injectable()
export class BlockStatusMiddleware {
  constructor(
    @inject("IClientRepository")
    private readonly clientRepository: IClientRepository,
    @inject("ITurfRepository")
    private readonly turfRepository: ITurfRepository,
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
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: "error",
          message: "Unauthorized: No user found in request",
        });
      }

      const { id, role } = req.user;
      let status: Boolean = false;

      console.log("middleware", role);

      if (role === "user") {
        const user = await this.clientRepository.findById(id);
        if (!user) {
          return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: ERROR_MESSAGES.USER_NOT_FOUND,
          });
        }
        status = user.isBlocked;
      }

      if (role === "turf") {
        const turf = await this.turfRepository.findById(id);
        if (!turf) {
          return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: "Turf user not found",
          });
        }
        status = turf.isBlocked;
      }

      if (status) {
        await this.blacklistTokenUseCase.execute(req.user.access_token);
        await this.revokeRefreshTokenUseCase.execute(req.user.refresh_token);

        const accessTokenName = `${role}_access_token`;
        const refreshTokenName = `${role}_refresh_token`;

        clearAuthCookies(res, accessTokenName, refreshTokenName);

        return res.status(HTTP_STATUS.FORBIDDEN).json({
          success: false,
          message: "Access denied: Your account has been blocked",
        });
      }

      next();
    } catch (error) {
      console.log("BlockedStatus Middleware has an error:", error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error while checking blocked status",
      });
    }
  };
}
