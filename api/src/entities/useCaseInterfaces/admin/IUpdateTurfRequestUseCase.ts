export interface IUpdateTurfRequestUseCase{
    execute(id:string,status:string,reason:string):Promise<void>
}