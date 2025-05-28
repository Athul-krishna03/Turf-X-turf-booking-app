import crypto,{ randomUUID } from "crypto";


export const generateUniqueUid = (prefix:string="Turf-X")=>{
    return `Turf_X-${prefix}-${randomUUID().slice(10)}`
}


export function generateBookingId() {
  const prefix = 'BK';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const randomPart = parseInt(crypto.randomBytes(4).toString('hex'), 16).toString(36).toUpperCase(); // 8-char random

  return `${prefix}-${date}-${randomPart}`;
}