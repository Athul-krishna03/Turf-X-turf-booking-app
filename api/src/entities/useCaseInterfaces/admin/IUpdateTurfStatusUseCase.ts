export interface IUpdateTurfStatusUseCase{
    execute(id:string):Promise<void>
}