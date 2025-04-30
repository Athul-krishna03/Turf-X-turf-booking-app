import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema as LoginSchema } from "../../utils/validations/loginvalidator";
import { LoginData as FormValues } from "../../types/Type";
import { GoogleAuthButton } from "./GoogleSignup";
import { CredentialResponse } from "@react-oauth/google";

export interface FormikLoginFormProps {
  onSubmit: (values: FormValues) => void;
  onGoogleLogin?: (credentialResponse:CredentialResponse) => void;
  userType?: "user" | "admin" | "turf";
}

const FormikLoginForm: React.FC<FormikLoginFormProps> = ({ onSubmit, onGoogleLogin, userType = "user"}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues: FormValues = {
    email: "",
    password: "",
    role: userType === "admin" ? "admin" : userType === "turf" ? "turf" : "user"
  };

  return (
    <div className="max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-2 text-white">
      {userType === "admin" ? "Admin Login" :
      userType === "turf" ? "Turf Owner Login" :
      "Sign in to your account"}
      </h1>
      <p className="text-center mb-8 text-[#8E9196]">
      {userType === "admin"
        ? "Admin Dashboard Access"
        : userType === "turf"
        ? "Turf Management Panel Access"
        : "Welcome back to our exclusive car auction platform"}
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-5">
              <label 
                htmlFor="email" 
                className="block text-sm mb-2 text-[#8E9196]"
              >
                Email
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E9196]" 
                  size={20}
                />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  className={`h-11 w-full rounded pl-10 pr-4 border-0 outline-none transition-all duration-300 ease-in-out bg-gray-900 text-white ${
                    errors.email && touched.email ? "ring-1 ring-red-500" : ""
                  }`}
                />
              </div>
              <ErrorMessage 
                name="email" 
                component="div" 
                className="mt-1 text-sm text-red-500" 
              />
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm text-[#8E9196]"
                >
                  Password
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-sm text-[#3BE188] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E9196]" 
                  size={20}
                />
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className={`h-11 w-full rounded pl-10 pr-10 border-0 outline-none transition-all duration-300 ease-in-out bg-gray-900 text-white ${
                    errors.password && touched.password ? "ring-1 ring-red-500" : ""
                  }`}
                />
                <div 
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8E9196] hover:text-white transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              <ErrorMessage 
                name="password" 
                component="div" 
                className="mt-1 text-sm text-red-500" 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full font-medium rounded py-3 px-4 transition-all duration-300 bg-[#3BE188] text-black hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
            >
            {userType === "admin"
        ? "Admin Sign In"
        : userType === "turf"
        ? "Turf Management Sign In"
        : "SignIn"}
            </button>
          </Form>
        )}
      </Formik>
      {userType === "user" && (
      <>
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute h-px w-full bg-[#2A2A2A]"></div>
          <span className="relative px-4 text-sm bg-[#121212] text-[#8E9196]">
            OR CONTINUE WITH
          </span>
        </div>
        
        <div>
          <GoogleAuthButton handleGoogleSuccess={onGoogleLogin ?? (() => {})} />
        </div>
      </>
      )}
      {userType === "user" && (
      <p className="text-center mt-8 text-sm text-[#8E9196]">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#3BE188] hover:underline">
          Create an account
        </Link>
      </p>
)}

    </div>
  );
};

export default FormikLoginForm;