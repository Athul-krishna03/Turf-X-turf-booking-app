export interface IGenerateOtpUseCase{
    execute(email:string):Promise<void>;
}