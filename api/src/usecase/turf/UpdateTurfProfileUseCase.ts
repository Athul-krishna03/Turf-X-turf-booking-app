import { inject, injectable } from "tsyringe";
import { IUpdateTurfProfileUseCase } from "../../entities/useCaseInterfaces/turf/IUpdateTurfProfileUseCase";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { ITurfEntity } from "../../entities/models/turf.entity";
import { TurfProfileResponse } from "../../shared/responseTypes/turfProfileResponse";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateTurfProfileUseCase implements IUpdateTurfProfileUseCase{
    constructor(
        @inject("ITurfRepository") private turfRepo:ITurfRepository
    ){}

    async execute(turfId: string, data: Partial<ITurfEntity>): Promise<TurfProfileResponse> {
        const isExist = await this.turfRepo.findById(turfId);
            console.log("edit user data",data)
            if (!isExist) {
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );
            }
            const updateProfile = await this.turfRepo.updateProfileById(
                turfId,
                data
            );
            console.log("use case update profile turf after repo",updateProfile);
            
            if (!updateProfile) {
            throw new CustomError(
                "Failed to update the profile",
                HTTP_STATUS.INTERNAL_SERVER_ERROR
            );
            }
            return updateProfile as TurfProfileResponse;
    }
}