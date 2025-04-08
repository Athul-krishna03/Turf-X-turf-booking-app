import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../ui/button";
import { Input } from '../ui/input'
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Car, User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { signupSchema } from "../../utils/validations/signupValidator";
import { SignupFormValues } from "../../types/Type";


interface SignupFormProps {
  onSubmit: (
    values: SignupFormValues,
    formikHelpers: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <Car className="h-10 w-10 text-green-400 mb-4" />
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-gray-400 mt-1">
          Join our exclusive car auction platform
        </p>
      </div>

      <Formik<SignupFormValues>
        initialValues={{
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        }}
        validationSchema={signupSchema}
        onSubmit={(values, { setSubmitting }) => {
            console.log("Form values",values)
          onSubmit(values, { setSubmitting });
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  className="pl-10 bg-gray-900 border-gray-800"
                />
              </div>
              <ErrorMessage
                name="fullName"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 bg-gray-900 border-gray-800"
                />
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="1234567890"
                  className="pl-10 bg-gray-900 border-gray-800"
                />
              </div>
              <ErrorMessage
                name="phoneNumber"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="pl-10 bg-gray-900 border-gray-800"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="pl-10 bg-gray-900 border-gray-800"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={values.agreeToTerms}
                onCheckedChange={(checked: boolean) =>
                  setFieldValue("agreeToTerms", checked)
                }
                className="border-gray-600"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="#" className="text-green-400 hover:underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-400 hover:underline">
                  privacy policy
                </a>
              </label>
            </div>
            <ErrorMessage
              name="agreeToTerms"
              component="p"
              className="text-red-500 text-sm"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-400 hover:bg-green-500 text-black"
            >
              {isSubmitting ? "Generating OTP..." : "Create account"}
            </Button>
          </Form>
        )}
      </Formik>
      <>
          <p className="text-center mt-8 text-sm text-[#8E9196]">
            Don't have an account?{" "}
            <a 
              href="/login" 
              className="text-[#3BE188] hover:underline cursor-pointer"
            >
              Login to Your Account
            </a>
          </p>
        </>

    </div>
  );
};

export default SignupForm;
