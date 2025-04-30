export interface IUpdateUserPassWordUseCase{
    execute(userId:string,currentPassword:string,newPassword:string):Promise<void>
}