import { z } from "zod";

import { strongEmailRegex } from "../../../shared/validation/email.validation";
import { passwordSchema } from "../../../shared/validation/password.validation";
import { nameSchema } from "../../../shared/validation/name.validation";
import { phoneNumberSchema } from "../../../shared/validation/phone.validation";

const userSignupSchema = z.object({
  name: nameSchema,
  email: strongEmailRegex,
  phone: phoneNumberSchema,
  password: passwordSchema,
  role:z.enum([ "user", "TurfOwner"]),
});

export const turfOwnerSchema = z.object({
  name: nameSchema, // Owner name or turf name depending on usage
  email: strongEmailRegex,
  phone: phoneNumberSchema,
  password: passwordSchema,
  role: z.literal("TurfOwner"),
  courtSize: z.string(),
  aminities: z.array(z.string()).min(1, "At least one amenity is required"),
  turfPhotos: z.array(z.string()).optional()
});
export const userSignupSchemas = {
  user: userSignupSchema,
  TurfOwner: turfOwnerSchema 
  
};

//login schema for both "user","admin" and "Turf owner"
export const loginSchema = z.object({
  email: strongEmailRegex,
  password: z.string().min(1, "password Required"),
  role: z.enum(["admin", "user", "TurfOwner"]),
});
