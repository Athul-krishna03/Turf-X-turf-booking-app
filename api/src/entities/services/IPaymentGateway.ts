import Stripe from "stripe";

export interface IPaymentGateway{
    retrieve(intentId:string):Promise<Stripe.PaymentIntent>;
    createPyamentIntent(price:number,slotId?:string):Promise<{ clientSecret: string}>
}