export interface User {
    id: string
    name: string
    email: string
    profileImage?: string
    walletBalance: number
}

export interface TurfDetails {
    turfPhotos: any
    name: string
    location: {
        city:string,
        state:string
    }
    imageUrl?: string
    aminities: string[]
}

export interface Booking {
    walletContributions(walletContributions: any): unknown
    playerCount: number
    userIds: any
    _id: string
    date: string
    time: string
    duration: number
    price: number
    status: "confirmed" | "pending" | "cancelled"
    participants: User[]
    createdBy: User
}

export interface JoinedGameData {
    booking: Booking
    turf: TurfDetails
}