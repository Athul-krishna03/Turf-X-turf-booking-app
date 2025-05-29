import { injectable ,inject} from "tsyringe";
import { IGetAllUsersUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllUserUseCase";
import { IClientRepository } from "../../entities/repositoryInterface/client/IClient-repository.interface";
import { PagenateCustomers } from "../../entities/models/pageinated-users.entity";


@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase{
    constructor(
        @inject("IClientRepository")
        private clientRepository:IClientRepository
    ){}

    async execute(pageNumber: number, pageSize: number, searchTerm: string): Promise<PagenateCustomers> {
        let filter:any={};
        if(searchTerm){
            filter.$or=[
                {name:{$regex:searchTerm,$options:"i"}},
                {email:{$regex:searchTerm,$options:"i"}}
            ]
        }
        const validPageNumber = Math.max(1,pageNumber || 1);
        const vaildPageSize = Math.max(1,pageSize || 10);
        const skip = (validPageNumber-1)*vaildPageSize;
        const limit = vaildPageSize;

        const {users,total}=await this.clientRepository.find(filter,skip,limit);
        console.log("total in admin",total)

        const reponse : PagenateCustomers={
            users,
            total:Math.ceil(total/vaildPageSize)
        }
        return reponse
    }
}