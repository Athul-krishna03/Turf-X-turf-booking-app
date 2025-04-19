import { injectable,inject } from "tsyringe";
import { IGetAllTurfUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllTurfsUseCase";
import { PagenateTurfs } from "../../entities/models/pageinated-turfs.entity";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";

@injectable()
export class GetAllTurfsUseCase implements IGetAllTurfUseCase{

    constructor(
        @inject("ITurfRepository")
        private turfRepository:ITurfRepository
    ){}
    async execute(pageNumber: number, pageSize: number, searchTerm: string): Promise<PagenateTurfs> {
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

        const {turfs,total} = await this.turfRepository.find(filter,skip,limit);

        const response:PagenateTurfs={
            turfs,
            total:Math.ceil(total/vaildPageSize)
        }
        return response
    }
}