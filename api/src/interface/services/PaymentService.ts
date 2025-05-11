import { inject, injectable } from "tsyringe";
import { IPaymentGateway } from "../../entities/services/IPaymentGateway";
import { IPaymentService } from "../../entities/services/IPaymentService";

@injectable()
export class PaymentService implements IPaymentService{
    constructor(
        @inject("IPaymentGateway") private paymentGateway:IPaymentGateway
    ){}

    async verifyPaymentIntent(intentId:string):Promise<boolean>{
        const paymentIntent = await this.paymentGateway.retrieve(intentId);
        return paymentIntent.status === "succeeded";
    }

    async createPaymentIntent(slotId: string, price: number): Promise<{ clientSecret: string}> {
        return await this.paymentGateway.createPyamentIntent(slotId,price)
    }
}