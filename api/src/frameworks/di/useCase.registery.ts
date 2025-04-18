import { container } from "tsyringe";

//bcrypt Imports

import { IBcrypt } from "../security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";

//strategy import
import { ClientRegisterStrategy } from "../../usecase/auth/register-stratergies/client-register.strategy";

//useCase Imports

import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/IRegister-usecase.interface";
import { RegisterUserUsecase } from "../../usecase/register-user-usecase";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/ILoginUserUseCase";
import { LoginUserUseCase } from "../../usecase/LoginUserUseCase";
import { ClientLoginStrategy } from "../../usecase/auth/login-strategies/clientLoginStrategy";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/IGenerateTokenUseCase";
import { GenerateTokenUseCase } from "../../usecase/GenerateTokenUseCase";
import { IGenerateOtpUseCase } from "../../entities/useCaseInterfaces/auth/IGenerateOtpUseCase";
import { GenerateOtpUseCase } from "../../usecase/auth/register-stratergies/GenerateOtpUseCase";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/IVerifyOtpUseCase";
import { VerifyOtpUseCase } from "../../usecase/auth/register-stratergies/VerifyOtp.useCase";
import { GoogleAuthUseCase } from "../../usecase/auth/GoogleAuthUseCase";
import { IGoogleAuthUseCase } from "../../entities/useCaseInterfaces/auth/IGoogleAuthUseCase";
import { TurfRegisterStrategy } from "../../usecase/auth/register-stratergies/Turf-register.strategy";


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
    //Register Strategy
    container.register("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });
    container.register("ClientLoginStrategy",{
      useClass:ClientLoginStrategy
    });
    container.register("TurfRegisterStrategy",{
      useClass:TurfRegisterStrategy
    })
    
  }
}
