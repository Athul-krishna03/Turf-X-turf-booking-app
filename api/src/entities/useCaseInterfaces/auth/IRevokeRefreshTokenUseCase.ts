export interface IRevokeRefreshTokenUseCase {
    execute(id:string):Promise<void>;
}