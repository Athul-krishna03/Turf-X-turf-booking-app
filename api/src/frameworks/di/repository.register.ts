import { container } from "tsyringe";

//respoitory imports
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { ClientRepository } from "../../interface/repositories/client/client.repository";



export class RepositoryRegistry{
    static registerRepositories():void{
        container.register<IClientRepository>("IClientRepository",{
            useClass:ClientRepository
        });
    }
}