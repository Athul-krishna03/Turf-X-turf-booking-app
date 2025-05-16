import Stripe from "stripe";
import { IPaymentGateway } from "../../entities/services/IPaymentGateway";

export class StripePaymentGateway implements IPaymentGateway{
    private stripe:Stripe;

    constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-04-30.basil",
    })
}
async retrieve(intentId: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(intentId);
}

async createPyamentIntent(price:number,slotId:string):Promise<{ clientSecret: string}>{
    if(!slotId){
        const paymentIntent = await this.stripe.paymentIntents.create({
        amount:price*100,
        currency:"inr",
        automatic_payment_methods:{enabled:true}
    })
    return {clientSecret:paymentIntent.client_secret as string}
    }else{
        const paymentIntent = await this.stripe.paymentIntents.create({
        amount:price*100,
        currency:"inr",
        metadata:{slotId},
        automatic_payment_methods:{enabled:true}
    })
    return {clientSecret:paymentIntent.client_secret as string}
    }
}

}