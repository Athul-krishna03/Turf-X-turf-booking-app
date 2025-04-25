import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
    name:Yup.string()
    .required("Name is required")
    .min(2,"Name must be at least 2 characters long"),
    phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    position:Yup.string()
    .min(2,"must be at least 2 characters long")
    .nullable()
}) 