import { container } from "tsyringe";

//bcrypt Imports

import { IBcrypt } from "../security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";

//strategy import
import { ClientLoginStrategy } from "../../usecase/auth/login-strategies/clientLoginStrategy";
import { ClientRegisterStrategy } from "../../usecase/auth/register-stratergies/client-register.strategy";
import { TurfRegisterStrategy } from "../../usecase/auth/register-stratergies/Turf-register.strategy";
import { TurfLoginStrategy } from "../../usecase/auth/login-strategies/TurfLoginStrategy";
//useCase Imports

import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/IRegister-usecase.interface";
import { RegisterUserUsecase } from "../../usecase/register-user-usecase";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/ILoginUserUseCase";
import { LoginUserUseCase } from "../../usecase/LoginUserUseCase";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/IGenerateTokenUseCase";
import { GenerateTokenUseCase } from "../../usecase/GenerateTokenUseCase";
import { IGenerateOtpUseCase } from "../../entities/useCaseInterfaces/auth/IGenerateOtpUseCase";
import { GenerateOtpUseCase } from "../../usecase/auth/register-stratergies/GenerateOtpUseCase";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/IVerifyOtpUseCase";
import { VerifyOtpUseCase } from "../../usecase/auth/register-stratergies/VerifyOtp.useCase";
import { GoogleAuthUseCase } from "../../usecase/auth/GoogleAuthUseCase";
import { IGoogleAuthUseCase } from "../../entities/useCaseInterfaces/auth/IGoogleAuthUseCase";
import { IGetAllUsersUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllUserUseCase";
import { GetAllUsersUseCase } from "../../usecase/admin/GetAllUserUseCase";
import { IGetAllTurfUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllTurfsUseCase";
import {  GetAllTurfsUseCase } from "../../usecase/admin/GetAllTurfsUseCase";


export class UseCaseRegistery {
  static registerUseCases(): void {
    //register bcrypts
    container.register<IBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    //usecase Registers
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUsecase,
    });
    container.register<ILoginUserUseCase>("ILoginUserUseCase",{
      useClass:LoginUserUseCase
    })
    container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase",{
      useClass:GenerateTokenUseCase
    })
    
    container.register<IGenerateOtpUseCase>("IGenerateOtpUseCase",{
      useClass:GenerateOtpUseCase
    })

    container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase",{
      useClass:VerifyOtpUseCase
    })

    container.register<IGoogleAuthUseCase>("IGoogleAuthUseCase",{
      useClass:GoogleAuthUseCase
    })

    container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase",{
      useClass:GetAllUsersUseCase
    })

    container.register<IGetAllTurfUseCase>("IGetAllTurfUseCase",{
      useClass:GetAllTurfsUseCase
    })
    //Register Strategy
    container.register("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });
    container.register("ClientLoginStrategy",{
      useClass:ClientLoginStrategy
    });
    container.register("TurfLoginStrategy",{
      useClass:TurfLoginStrategy
    })
    container.register("TurfRegisterStrategy",{
      useClass:TurfRegisterStrategy
    })
    
  }
}
