"use client";

import type React from "react";
import { useState } from "react";
import SignupForm from "../../components/auth/SignupForm";
import type { RegisterData, SignupFormValues } from "../../types/Type";
import { useNavigate } from "react-router-dom";
import {
  useGoogleAuth,
  useRegister,
  useSendOtp,
  useVerifyOtp,
} from "../../hooks/auth/useAuth";
import { useToast } from "../../hooks/useToast";
import OTPModal from "../../components/modals/OTPmodal";
import { GoogleAuthButton } from "../../components/auth/GoogleSignup";
import { CredentialResponse } from "@react-oauth/google";
import { userLogin } from "../../store/slices/user.slice";
import { useDispatch } from "react-redux";

const SignUp: React.FC = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [formData, setFormData] = useState<RegisterData | null>(null);
  const navigate = useNavigate();
  const googleLogin = useGoogleAuth();

  const registerUser = useRegister();
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      setEmail(values.email);
      const registerData: RegisterData = {
        name: values.fullName || "",
        email: values.email,
        phone: values.phoneNumber || "",
        password: values.password,
        role: "user",
      };

      setFormData(registerData);

      const response = await sendOtp.mutateAsync(values.email);
      if (response.status === 201) {
        setIsOTPModalOpen(true);
        toast({
          title: "OTP Sent",
          description: "Check your email for the OTP.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resendOtp = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please try signing up again",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await sendOtp.mutateAsync(email);
      if (response.status === 201) {
        setIsOTPModalOpen(true);
        toast({
          title: "OTP Sent",
          description: "Check your email for the OTP.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to Resend OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!formData) {
      toast({
        title: "Error",
        description: "Missing registration data. Please try again.",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      const optResponse = await verifyOtp.mutateAsync({ email, otp });

      if (optResponse) {
        await registerUser.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Account created successfully! 🎉",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast({
        title: "Invalid OTP",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    googleLogin.mutate(
      {
        credential: credentialResponse.credential,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        role: "user",
      },
      {
        onSuccess: (data: any) => {
          toast({
            title: "Success",
            description: data.message || "You have successfully logged in",
          });
          dispatch(userLogin(data.user));
          navigate("/dashboard");
        },
      }
    );
  };

  return (
    <>
      <div className="flex min-h-screen bg-black">
        {/* Left Panel - Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
          <img
            src="/pexels-tima-miroshnichenko-6078307.jpg"
            alt="Football turf"
            className="object-cover h-full w-full"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-12 z-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg
                  className="w-7 h-7 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5l6-4.5-6-4.5v9z" />
                </svg>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-white tracking-wider">
                  TURF-X
                </span>
                <span className="text-green-500 text-xs ml-1 font-medium">
                  BOOKING
                </span>
              </div>
            </div>

            {/* Marketing Content */}
            <div className="max-w-md">
              <div className="w-16 h-1 bg-green-500 mb-6"></div>
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Book Your Perfect Pitch
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Join Turf-X to easily book football turfs, organize matches, and
                connect with other players in your area. Get exclusive access to
                premium fields and special discounts.
              </p>

              {/* Feature Icons */}
              <div className="mt-8 flex space-x-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-white">100+ Turfs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-white">24/7 Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-8 px-4 md:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5l6-4.5-6-4.5v9z" />
                </svg>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-white tracking-wider">
                  TURF-X
                </span>
                <span className="text-green-500 text-xs ml-1 font-medium">
                  BOOKING
                </span>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                Create Your Account
              </h1>
              <div className="w-16 h-1 bg-green-500 mx-auto my-3"></div>
              <p className="text-gray-400">
                Join Turf-X to start booking football turfs instantly
              </p>
            </div>

            {/* SignupForm component */}
            <div className="mb-6">
              <SignupForm onSubmit={handleSubmit} />
            </div>

            {/* Or divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center">
              <GoogleAuthButton handleGoogleSuccess={handleGoogleLogin} />
            </div>

            {/* Terms */}
            <div className="mt-8 pt-4 border-t border-gray-800 text-xs text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-green-500 hover:text-green-400">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-green-500 hover:text-green-400">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onResend={resendOtp}
        onVerify={handleVerifyOtp}
        isLoading={isLoading}
        title="Verify your Email"
        subtitle={`We've sent a 6-digit code to ${email}. Enter it below to verify your account.`}
      />
    </>
  );
};

export default SignUp;