import { injectable } from "tsyringe";
import { IOtpService } from "../../entities/services/IOtpServices";




@injectable()
export class OtpService implements IOtpService{
    async generateOtp(): Promise<string> {
          return Math.floor(100000 + Math.random()*900000).toString()
    }
    
}