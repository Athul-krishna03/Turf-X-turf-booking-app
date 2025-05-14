
export interface IHostedGame {
    _id?: string
    title: string
    hostName: string
    venueName: string
    location: string
    date: string
    time: string
    duration:number
    playersJoined: number
    playerCount: number
    amountPerPlayer: number
    sportType:string
    description?: string
    status: string
    userIds: string[]
    imageUrl?: string
}
