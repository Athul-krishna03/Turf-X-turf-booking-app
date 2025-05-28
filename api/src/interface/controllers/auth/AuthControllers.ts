import { inject, injectable } from "tsyringe";

import { IAuthController } from "../../../entities/controllerInterfaces/auth/IAuthController";

import { Request, Response } from "express";

import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";

import { loginSchema, userSignupSchemas } from "../validations/user-signup.validation.schema";

import { LoginUserDTO, UserDTO } from "../../../shared/dtos/user.dto";

import { handleErrorResponse } from "../../../shared/utils/errorHandler";

import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/IRegister-usecase.interface";
import { ILoginUserUseCase } from "../../../entities/useCaseInterfaces/auth/ILoginUserUseCase";
import { IGenerateTokenUseCase } from "../../../entities/useCaseInterfaces/auth/IGenerateTokenUseCase";
import { clearAuthCookies, setAuthCookies, updateCookieWithAccessToken } from "../../../shared/utils/cookieHelper";
import { IUserExistenceService } from "../../../entities/services/Iuser-existence-service.interface";
import { IGenerateOtpUseCase } from "../../../entities/useCaseInterfaces/auth/IGenerateOtpUseCase";
import { otpMailValidationSchema } from "../validations/otp-mail.validation.schema";
import { IVerifyOtpUseCase } from "../../../entities/useCaseInterfaces/auth/IVerifyOtpUseCase";
import { IGoogleAuthUseCase } from "../../../entities/useCaseInterfaces/auth/IGoogleAuthUseCase";
import { error } from "console";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { IBlackListTokenUseCase } from "../../../entities/repositoryInterface/auth/IBlackListTokenUseCase";
import { IRefreshTokenUseCase } from "../../../entities/useCaseInterfaces/auth/IRefreshTokenUseCase";
import { ILoginTurfUseCase } from "../../../entities/useCaseInterfaces/auth/ILoginTurfUseCase";
import { IUserEntity } from "../../../entities/models/user.entity";
import { ITurfEntity } from "../../../entities/models/turf.entity";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IRegisterUserUseCase")
    private registerUserUseCase: IRegisterUserUseCase,
    @inject("ILoginUserUseCase")
    private LoginUserUseCase:ILoginUserUseCase,
    @inject("IGenerateTokenUseCase")
    private GenerateTokenUseCase:IGenerateTokenUseCase,
    @inject("IUserExistenceService")
    private userExistenceService:IUserExistenceService,
    @inject('IGenerateOtpUseCase')
    private generateOtpUseCase:IGenerateOtpUseCase,
    @inject('IVerifyOtpUseCase')
    private verifyOtpUseCase:IVerifyOtpUseCase,
    @inject('IGoogleAuthUseCase')
    private googleAuthUseCase:IGoogleAuthUseCase,
    @inject("IBlackListTokenUseCase")
    private blacklistTokenUseCase:IBlackListTokenUseCase,
    @inject("IRefreshTokenUseCase")
    private refreshTokenUseCase:IRefreshTokenUseCase
  ) {}

  //register use
  async register(req: Request, res: Response): Promise<void> {
    console.log("entered",req.body);
    
    try {

      
      const { role } = req.body as UserDTO;

      if (role !== 'user' && role !== 'turf') {
        res.status(400).json({ message: "Invalid role" });
        return
      }
      console.log(role)
      const schema = userSignupSchemas[role as keyof typeof userSignupSchemas];
      console.log("schema in register",schema)
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
      console.log(error)
      handleErrorResponse(res, error);
    }
  }

  //login User

 async login(req: Request, res: Response): Promise<void> {
    console.log("entered to login controller");

    try {
      const data = req.body as LoginUserDTO;
      const validateData = loginSchema.parse(data);
      const user =  await this.LoginUserUseCase.execute(validateData)
      console.log("user data",user)
      if(!user.id || !user.email || !user.role){
        throw new Error("User ID,Email,or Role is missing")
      }

      const tokens = await this.GenerateTokenUseCase.execute(
        user.id,
        user.email,
        user.role
      );


      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;
      setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
      accessTokenName,
      refreshTokenName
      )
      console.log("auth login",user)
      if (user.role === "user" || user.role === "admin") {
        const userEntity = user as IUserEntity;
      
        res.status(HTTP_STATUS.OK).json({
          success: true,
          message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
          user: {
            name: userEntity.name,
            email: userEntity.email,
            role: userEntity.role,
            phone: userEntity.phone,
            position: userEntity.position,
            profileImage: userEntity.profileImage,
            walletBalance:userEntity.walletBalance,
            bio: userEntity.bio,
            joinedAt: userEntity.joinedAt
          }
        });
      } else if (user.role === "turf") {
        const turfEntity = user as ITurfEntity;
      
        res.status(HTTP_STATUS.OK).json({
          success: true,
          message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
          user: {
            turfId:turfEntity.turfId,
            name: turfEntity.name,
            email: turfEntity.email,
            role: turfEntity.role,
            phone: turfEntity.phone,
            status: turfEntity.status,
            courtSize: turfEntity.courtSize,
            location:turfEntity.location,
            turfPhotos:turfEntity.turfPhotos,
            aminities:turfEntity.aminities
          }
        });
      }
      
      
    } catch (error) {
      console.log(error)
      handleErrorResponse(res,error)
    }
    
  }

  //send Otp Email
  async sendOtpEmail(req:Request,res:Response):Promise<void>{
    
    const {email} = req.body;
    try {
      const existingEmail =  await this.userExistenceService.emailExists(email);
      if(existingEmail){
        res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({message:ERROR_MESSAGES.EMAIL_EXISTS})
      return;
      }

      await this.generateOtpUseCase.execute(email);

      res
      .status(HTTP_STATUS.CREATED)
      .json({message:SUCCESS_MESSAGES.OTP_SEND_SUCCESS})

      
    } catch (error) {
      handleErrorResponse(res,error)
    }
  }


  //verify otp
  async verifyOtp(req:Request,res:Response):Promise<void>{
    try {
      const {email,otp} = req.body;
      const validateData = otpMailValidationSchema.parse({email,otp})
      await this.verifyOtpUseCase.execute(validateData);
      res.status(HTTP_STATUS.OK).json({
        success:true,
        message:SUCCESS_MESSAGES.VERIFICATION_SUCCESS
      })
    } catch (error) {
      handleErrorResponse(res,error)
    }
  }


  //google Auth
  async googleAuth(req:Request,res:Response):Promise<void>{
    try{
      const {credential,client_id,role}=req.body;

      console.log("heloo google",req.body)
      const user = await this.googleAuthUseCase.execute(credential,client_id,role);
      console.log("user data",user)

      if(!user.id || !user.email || !user.role){
        throw new Error("User ID,email,or role is missing");
      }

      const tokens = await this.GenerateTokenUseCase.execute(
        user.id,
        user.email,
        user.role
      );

      const access_token_name = `${user.role}_access_token`;
      const refresh_token_name = `${user.role}_refresh_token`;

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        access_token_name,
        refresh_token_name
      )

      res.status(HTTP_STATUS.OK).json({
        success:true,
        message:SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          phone:user.phone,
          profileImage:user.profileImage,
          bio:user.bio,
          joinedAt:user.joinedAt
        }
      })
    }catch{
      handleErrorResponse(res,error)
    }
  }
  // Logout user

  async logout(req:Request,res:Response):Promise<void>{
    try {
      const user = (req as CustomRequest).user;
      await this.blacklistTokenUseCase.execute(
        (req as CustomRequest).user.access_token
      );

      console.log("logout user", user);
      const accessTokenName = `${user.role}_access_token`;
      const refreshTokenName = `${user.role}_refresh_token`;

      clearAuthCookies(res, accessTokenName, refreshTokenName);
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
   refreshToken(req:Request,res:Response):void{
    try {
      const refreshToken = (req as CustomRequest).user.refresh_token;
      const newTokens = this.refreshTokenUseCase.execute(refreshToken);
      console.log("newtoken",newTokens);
      
      const accessTokenName = `${newTokens.role}_access_token`;
      updateCookieWithAccessToken(
        res,
        newTokens.accessToken,
        accessTokenName
      );
      res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGES.OPERATION_SUCCESS});
    } catch (error) {
      clearAuthCookies(
        res,
        `${(req as CustomRequest).user.role}_access_token`,
        `${(req as CustomRequest).user.role}_refresh_token`
      );
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
   }
}
