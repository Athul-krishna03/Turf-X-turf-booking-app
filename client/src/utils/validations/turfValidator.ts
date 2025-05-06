import * as Yup from "yup";
export const turfDetailsSchema = Yup.object().shape({
    name: Yup.string().required("Turf name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    facilities: Yup.array(),
})