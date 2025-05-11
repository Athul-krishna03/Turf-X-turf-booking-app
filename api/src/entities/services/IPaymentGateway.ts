import Stripe from "stripe";

export interface IPaymentGateway{
    retrieve(intentId:string):Promise<Stripe.PaymentIntent>;
    createPyamentIntent(slotId:string,price:number):Promise<{ clientSecret: string}>
}