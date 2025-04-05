import { RepositoryRegistry } from "./repository.register";
import { UseCaseRegistery } from "./useCase.registery";




export class DependencyInjection{
    static registerAll():void{
        RepositoryRegistry.registerRepositories();
        UseCaseRegistery.registerUseCases();
    }
}