import * as Yup from "yup";

interface SignupFormValues {
  fullName: string;
  email: string;
  phoneNumber:string;
  password: string;
  confirmPassword: string;
}

export const signupSchema: Yup.ObjectSchema<SignupFormValues> = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
    
    password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long") 
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
  
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});