import { inject,injectable } from "tsyringe";
import { IUserExistenceService } from "../../entities/services/Iuser-existence-service.interface";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";

@injectable()
export class UserExistenceService implements IUserExistenceService{
    constructor(
        @inject("IClientRepository") private clientRepo:IClientRepository
    ){}

    async emailExists(email: string): Promise<boolean> {
        const user = await this.clientRepo.findByEmail(email);
        console.log(user)
        return !!user
    }
}