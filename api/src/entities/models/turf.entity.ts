

export interface ITurfEntity{
    id?: string;
    turfId:string;
    name?: string;
    email?: string;
    password: string;
    phone?: string;
    createdAt?: Date;
    role:string;
    isBlocked: Boolean;
    aminities?:string[];
    turfPhotos?:string[];
    courtSize:string

}