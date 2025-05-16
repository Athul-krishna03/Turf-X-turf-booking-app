export interface IPaymentService{
    verifyPaymentIntent(intentId:string):Promise<boolean>
    createPaymentIntent(price:number,slotId?:string):Promise<{ clientSecret: string}>
}