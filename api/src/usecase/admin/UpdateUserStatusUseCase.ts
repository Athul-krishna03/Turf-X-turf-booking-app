import { inject, injectable } from "tsyringe";
import { IUpdateUserStatusUseCase } from "../../entities/useCaseInterfaces/admin/IUpdateUserStatusUseCase";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";

@injectable()
export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase{
    constructor(
        @inject("IClientRepository") private clientRepository:IClientRepository
    ){}

    async execute(id: string): Promise<void> {
        await this.clientRepository.findByIdAndUpdateStatus(id)
    }
}