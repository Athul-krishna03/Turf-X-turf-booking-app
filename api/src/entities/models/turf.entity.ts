

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
    status:string;
    aminities?:string[];
    turfPhotos?:string[];
    courtSize:string

}