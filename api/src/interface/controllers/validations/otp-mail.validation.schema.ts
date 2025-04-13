import {z} from "zod";
import { strongEmailRegex } from "../../../shared/validation/email.validation";

export const otpMailValidationSchema = z.object({
    email:strongEmailRegex,
    otp:z.string().length(6,"OTP must be exactly 6 digits").regex(/^\d{6}$/, "OTP must contain only numbers"),
})