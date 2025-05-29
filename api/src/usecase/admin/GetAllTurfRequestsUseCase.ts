import { injectable,inject } from "tsyringe";
import { PagenateTurfs } from "../../entities/models/pageinated-turfs.entity";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { IGetAllTurfRequestsUseCase } from "../../entities/useCaseInterfaces/admin/IGetAllTurfRequestsUsecase";

@injectable()
export class GetAllTurfRequestsUseCase implements IGetAllTurfRequestsUseCase{

    constructor(
        @inject("ITurfRepository")
        private _turfRepository:ITurfRepository
    ){}
    async execute(pageNumber: number, pageSize: number, searchTerm: string): Promise<PagenateTurfs> {
        let filter:any={status:{$ne:"approved"}};
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

        const {turfs,total} = await this._turfRepository.find(filter,skip,limit);

        const response:PagenateTurfs={
            turfs,
            total:Math.ceil(total/vaildPageSize)
        }
        return response
    }
}