import { UserDTO } from "./user.dto";

export interface TurfRegisterDTO extends UserDTO {
    courtSize: string;
    turfPhotos:string[];
    aminities: string[];
}