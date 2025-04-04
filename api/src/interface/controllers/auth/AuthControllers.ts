import { inject, injectable } from "tsyringe";

import { IAuthController } from "../../../entities/controllerInterfaces/auth/IAuthController";

import { Request, Response } from "express";

import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";

import { userSignupSchemas } from "../validations/user-signup.validation.schema";

import { LoginUserDTO, UserDTO } from "../../../shared/dtos/user.dto";

import { handleErrorResponse } from "../../../shared/utils/errorHandler";

import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/IRegister-usecase.interface";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IRegisterUserUseCase")
    private registerUserUseCase: IRegisterUserUseCase
  ) {}

  //register user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { role } = req.body as UserDTO;
      const schema = userSignupSchemas[role];
      if (!schema) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
        return;
      }
      const validateData = schema.parse(req.body);
      await this.registerUserUseCase.execute(validateData);
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
