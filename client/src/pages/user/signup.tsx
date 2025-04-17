"use client";

import type React from "react";
import { useState } from "react";
import SignupForm from "../../components/auth/SignupForm";
import type { RegisterData, SignupFormValues } from "../../types/Type";
import { useNavigate } from "react-router-dom";
import {
  useRegister,
  useSendOtp,
  useVerifyOtp,
} from "../../hooks/auth/useAuth";
import { useToast } from "../../hooks/useToast";
import OTPModal from "../../components/modals/OTPmodal";

const SignUp: React.FC = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [formData, setFormData] = useState<RegisterData | null>(null);
  const navigate = useNavigate();

  const registerUser = useRegister();
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();
  const { toast } = useToast();

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
      console.log("otp response", optResponse);

      if (optResponse) {
        console.log("verify OTP");
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

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a]">
        {/* Left Panel - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-black relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
          <img
            src="\pexels-tima-miroshnichenko-6078307.jpg"
            alt="Football turf"
            className="object-cover h-full w-full opacity-80"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-10 z-20">
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

              <div className="mt-8 flex space-x-4">
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

        {/* Right Panel - Form - Modified to fit the screen */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 bg-black overflow-y-auto">
          <div className="w-full max-w-md flex flex-col h-full justify-between">
            <div className="flex-1 flex flex-col justify-center">
              <div className="lg:hidden flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5l6-4.5-6-4.5v9z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-white tracking-wider">
                    TURF-X
                  </span>
                  <span className="text-green-500 text-xs ml-1 font-medium">
                    BOOKING
                  </span>
                </div>
              </div>

              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Create Your Account
                </h1>
                <div className="w-12 h-1 bg-green-500 mx-auto mb-2"></div>
                <p className="text-gray-400 text-xs">
                  Join Turf-X to start booking football turfs instantly
                </p>
              </div>

              {/* SignupForm component */}
              <div className="w-full h-full justify-center">
                <SignupForm onSubmit={handleSubmit} />
              </div>

              <div className="mt-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[#0a0a0a] text-gray-500">
                      or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="flex justify-center items-center py-2 px-3 border border-gray-800 rounded-lg hover:bg-gray-900 hover:border-green-500/50 transition-all duration-300 group">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-white text-sm group-hover:text-green-400 transition-colors duration-300">
                      Google
                    </span>
                  </button>
                  <button className="flex justify-center items-center py-2 px-3 border border-gray-800 rounded-lg hover:bg-gray-900 hover:border-green-500/50 transition-all duration-300 group">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                    <span className="text-white text-sm group-hover:text-green-400 transition-colors duration-300">
                      Facebook
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-center text-xs text-gray-500">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-green-500 hover:text-green-400 font-medium"
                >
                  Sign in
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-600 text-center">
                By signing up, you agree to our{" "}
                <a
                  href="/terms"
                  className="text-green-500 hover:text-green-400"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-green-500 hover:text-green-400"
                >
                  Privacy Policy
                </a>
              </div>
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
