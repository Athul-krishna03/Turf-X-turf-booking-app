import { container } from "tsyringe";

//bcrypt Imports

import { IBcrypt } from "../security/bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";

//strategy import 
import { ClientRegisterStrategy } from "../../usecase/register-stratergies/client-register.strategy";

//useCase Imports

import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/IRegister-usecase.interface";
import { RegisterUserUsecase } from "../../usecase/register-user-usecase";



export class UseCaseRegistery{
    static registerUseCases():void{

        //register bcrypts 
        container.register<IBcrypt>("IPasswordBcrypt",{
            useClass:PasswordBcrypt
        })

        //usecase Registers
        container.register<IRegisterUserUseCase>("IRegisterUserUseCase",{
            useClass:RegisterUserUsecase
        })

        //Register Strategy
        container.register("ClientRegisterStrategy",{
            useClass:ClientRegisterStrategy
        })
    }
};