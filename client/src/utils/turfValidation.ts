import * as Yup from 'yup';


  export const turfvalidationSchema = Yup.object({
    name: Yup.string().required('Turf name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    courtSize: Yup.string().required('Court size is required'),
  });