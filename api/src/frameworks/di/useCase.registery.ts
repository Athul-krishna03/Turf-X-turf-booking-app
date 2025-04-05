import { container } from "tsyringe";


//strategy import 


//useCase Imports

import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/IRegister-usecase.interface";
import { RegisterUserUsecase } from "../../usecase/register-user-usecase";


export class UseCaseRegistery{
    static registerUseCases():void{
        container.register<IRegisterUserUseCase>("IRegisterUserUseCase",{
            useClass:RegisterUserUsecase
        })
    }
};