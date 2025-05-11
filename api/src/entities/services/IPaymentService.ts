export interface IPaymentService{
    verifyPaymentIntent(intentId:string):Promise<boolean>
    createPaymentIntent(slotId:string,price:number):Promise<{ clientSecret: string}>
}