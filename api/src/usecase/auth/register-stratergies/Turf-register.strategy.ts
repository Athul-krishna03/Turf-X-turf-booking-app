import { injectable,inject} from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { ITurfRepository } from "../../../entities/repositoryInterface/turf/ITurfRepository";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { IUserEntity } from "../../../entities/models/user.entity";
import { TurfRegisterDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { generateUniqueUid } from "../../../frameworks/security/uniqueuid.bcrypt";





@injectable()
export class TurfRegisterStrategy implements IRegisterStrategy{
    constructor(
        @inject("ITurfRepository") private turfRepository:ITurfRepository,
        @inject("IPasswordBcrypt") private PasswordBcrypt:IBcrypt

    ){}

    async register(user: UserDTO): Promise<IUserEntity | void> {
        const existTurf = await this.turfRepository.findByEmail(user.email);
        console.log("existing",existTurf);
        

        if(existTurf){
            throw new CustomError(ERROR_MESSAGES.EMAIL_EXISTS,HTTP_STATUS.CONFLICT);
        }
        
        const {
            name,
            email,
            phone,
            password,
            role,
            courtSize,
            aminities,
            turfPhotos
        } = user as TurfRegisterDTO;
        
        let hashedPassword = null;
        if(password){
            hashedPassword = await this.PasswordBcrypt.hash(password);
        }

        const turfId=generateUniqueUid(role);

        try{
            const newTurf = await this.turfRepository.save({
                name,
                email,
                password: hashedPassword ?? "",
                phone,
                turfId,
                role,
                isBlocked: false,
                courtSize,
                turfPhotos,
                aminities,
            });
            console.log("turf data",newTurf);
            
            return {
                name,
                email,
                password,
                phone,
                role,
                isBlocked:newTurf.isBlocked,
            } as IUserEntity;
        }catch(error){
            throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
        }
    }
}