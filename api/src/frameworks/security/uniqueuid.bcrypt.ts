import { randomUUID } from "crypto";

export const generateUniqueUid = (prefix:string="Turf-X")=>{
    return `Turf_X-${prefix}-${randomUUID().slice(10)}`
}