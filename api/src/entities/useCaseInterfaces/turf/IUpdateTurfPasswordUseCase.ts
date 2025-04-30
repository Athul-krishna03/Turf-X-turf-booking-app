export interface IUpdateTurfPassWordUseCase{
    execute(userId:string,currentPassword:string,newPassword:string):Promise<void>
}