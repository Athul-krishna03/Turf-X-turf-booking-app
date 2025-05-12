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
import { GetAllTurfsUseCase } from "../../usecase/admin/GetAllTurfsUseCase";
import { IUpdateUserStatusUseCase } from "../../entities/useCaseInterfaces/admin/IUpdateUserStatusUseCase";
import { UpdateUserStatusUseCase } from "../../usecase/admin/UpdateUserStatusUseCase";
import { IUpdateTurfStatusUseCase } from "../../entities/useCaseInterfaces/admin/IUpdateTurfStatusUseCase";
import { UpdateTurfStatusUseCase } from "../../usecase/admin/UpdateTurfStatusUseCase";
import { IGetAllTurfRequestsUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllTurfRequestsUsecase";
import { GetAllTurfRequestsUseCase } from "../../usecase/admin/GetAllTurfRequestsUseCase";
import { IUpdateTurfRequestUseCase } from "../../entities/useCaseInterfaces/admin/IUpdateTurfRequestUseCase";
import { UpdateTurfRequestUseCase } from "../../usecase/admin/UpdateTurfRequestUseCase";
import { IBlackListTokenUseCase } from "../../entities/repositoryInterface/auth/IBlackListTokenUseCase";
import { BlackListTokenUseCase } from "../../usecase/auth/BlackListTokenUseCase";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/IRefreshTokenUseCase";
import { RefreshTokenUseCase } from "../../usecase/auth/RefreshTokenUseCase";
import { IUpdateProfileUseCase } from "../../entities/useCaseInterfaces/user/IUpdateProfileUseCase";
import { UpdateProfileUseCase } from "../../usecase/user/UpdateProfileUseCase";
import { IGenerateSlotUseCase } from "../../entities/useCaseInterfaces/turf/IGenerateSlotUseCase";
import { GenerateSlotUseCase } from "../../usecase/turf/GenerateSlotsUseCase";
import { IUpdateUserPassWordUseCase } from "../../entities/useCaseInterfaces/user/IUpdateUserPassWordUseCase";
import { UpdateUserPassWordUseCase } from "../../usecase/user/UpdateUserPasswordUseCase";
import { IUpdateTurfProfileUseCase } from "../../entities/useCaseInterfaces/turf/IUpdateTurfProfileUseCase";
import { UpdateTurfProfileUseCase } from "../../usecase/turf/UpdateTurfProfileUseCase";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/IRevokeRefreshTokenUseCase";
import { RevokeRefreshTokenUseCase } from "../../usecase/auth/RevokeRefreshTokenUseCase";
import { IUpdateTurfPassWordUseCase } from "../../entities/useCaseInterfaces/turf/IUpdateTurfPasswordUseCase";
import { UpdateTurfPassWordUseCase } from "../../usecase/turf/UpdateTurfPasswordUseCase";
import { IGetSlotUseCase } from "../../entities/useCaseInterfaces/turf/IGetSlotUseCase";
import { GetSlotUseCase } from "../../usecase/turf/GetSlotsUseCase";
import { IDeleteExpiredSlotsUseCase } from "../../entities/useCaseInterfaces/IDeleteExpiredSlotsUseCase";
import { DeleteExpiredSlotsUseCase } from "../../usecase/slot/DeleteExpiredSlotsUseCase";
import { IBookingSlotUseCase } from "../../entities/useCaseInterfaces/IBookingSlotUseCase";
import { BookingSlotUseCase } from "../../usecase/slot/BookingSlotUseCase";
import { IGetUserBookingDetialsUseCase } from "../../entities/useCaseInterfaces/user/IGetUserBookingDetialsUseCase";
import { GetUserBookingDetialsUseCase } from "../../usecase/getBookingDetialsUseCase";
import { IUpdateSlotStatusUseCase } from "../../entities/useCaseInterfaces/IUpdateSlotStatusUseCase";
import { UpdateSlotStatusUseCase } from "../../usecase/slot/UpdateSlotStatusUseCase";
import { IGetSlotDataUseCase } from "../../entities/useCaseInterfaces/slot/IGetSlotDataUseCase";
import { GetSlotDataUseCase } from "../../usecase/slot/GetSlotUseCase";

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
    container.register<ILoginUserUseCase>("ILoginUserUseCase", {
      useClass: LoginUserUseCase,
    });
    container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
      useClass: GenerateTokenUseCase,
    });

    container.register<IGenerateOtpUseCase>("IGenerateOtpUseCase", {
      useClass: GenerateOtpUseCase,
    });

    container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
      useClass: VerifyOtpUseCase,
    });

    container.register<IGoogleAuthUseCase>("IGoogleAuthUseCase", {
      useClass: GoogleAuthUseCase,
    });

    container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase", {
      useClass: GetAllUsersUseCase,
    });

    container.register<IGetAllTurfUseCase>("IGetAllTurfUseCase", {
      useClass: GetAllTurfsUseCase,
    });

    container.register<IUpdateUserStatusUseCase>("IUpdateUserStatusUseCase", {
      useClass: UpdateUserStatusUseCase,
    });

    container.register<IUpdateTurfStatusUseCase>("IUpdateTurfStatusUseCase", {
      useClass: UpdateTurfStatusUseCase,
    });
    container.register<IGetAllTurfRequestsUseCase>(
      "IGetAllTurfRequestsUseCase",
      {
        useClass: GetAllTurfRequestsUseCase,
      }
    );

    container.register<IUpdateTurfRequestUseCase>("IUpdateTurfRequestUseCase", {
      useClass: UpdateTurfRequestUseCase,
    });

    container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase", {
      useClass: BlackListTokenUseCase,
    });

    container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
      useClass: RefreshTokenUseCase,
    });
    container.register<IUpdateProfileUseCase>("IUpdateProfileUsecase", {
      useClass: UpdateProfileUseCase,
    });

    container.register<IGenerateSlotUseCase>("IGenerateSlotUseCase",{
      useClass:GenerateSlotUseCase
    })

    container.register<IUpdateUserPassWordUseCase>("IUpdateUserPassWordUseCase",{
      useClass:UpdateUserPassWordUseCase
    })
    
    container.register<IUpdateTurfPassWordUseCase>("IUpdateTurfPassWordUseCase",{
      useClass:UpdateTurfPassWordUseCase
    })

    container.register<IUpdateTurfProfileUseCase>("IUpdateTurfProfileUseCase",{
      useClass:UpdateTurfProfileUseCase
    })
    container.register<IRevokeRefreshTokenUseCase>(
      "IRevokeRefreshTokenUseCase",
      {
        useClass:RevokeRefreshTokenUseCase,
      }
    );

    container.register<IGetSlotUseCase>("IGetSlotsUseCase",{
      useClass:GetSlotUseCase
    })
    container.register<IDeleteExpiredSlotsUseCase>("IDeleteExpiredSlotsUseCase",{
      useClass:DeleteExpiredSlotsUseCase
    })

    container.register<IBookingSlotUseCase>("IBookingSlotUseCase",{
      useClass:BookingSlotUseCase
    })

    container.register<IGetUserBookingDetialsUseCase>("IGetUserBookingDetialsUseCase",{
      useClass:GetUserBookingDetialsUseCase
    })

    container.register<IUpdateSlotStatusUseCase>("IUpdateSlotStatusUseCase",{
      useClass:UpdateSlotStatusUseCase
    })

    container.register<IGetSlotDataUseCase>("IGetSlotDataUseCase",{
      useClass:GetSlotDataUseCase
    })
    //Register Strategy
    container.register("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });
    container.register("ClientLoginStrategy", {
      useClass: ClientLoginStrategy,
    });
    container.register("TurfLoginStrategy", {
      useClass: TurfLoginStrategy,
    });
    container.register("TurfRegisterStrategy", {
      useClass: TurfRegisterStrategy,
    });
  }
}
