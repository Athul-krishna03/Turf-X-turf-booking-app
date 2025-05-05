import { container } from "tsyringe";
import { CronController } from "../../interface/controllers/cronControllers";
import { RepositoryRegistry } from "./repository.register";
import { UseCaseRegistery } from "./useCase.registery";




export class DependencyInjection{
    static registerAll():void{
        container.register<CronController>('CronController', {
            useClass: CronController,
          });

        RepositoryRegistry.registerRepositories();
        UseCaseRegistery.registerUseCases();
    }
}