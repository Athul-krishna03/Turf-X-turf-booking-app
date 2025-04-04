import {z} from 'zod'

export const strongEmailRegex = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{
    message:"Inavlid Email Format"
});