
import React, { useState } from "react";
import SignupForm from "../components/auth/SignupForm"; // Your existing component
import { RegisterData, SignupFormValues } from '../types/Type'
import { useNavigate } from "react-router-dom";
import { useRegister,useSendOtp, useVerifyOtp} from "../hooks/auth/useAuth";
import { useToast } from "../hooks/useToast";
import OTPModal from "../components/modals/OTPmodal";


const SignUp :React.FC=() => {
  const [isOTPModalOpen,setIsOTPModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [formData, setFormData] = useState<RegisterData | null>(null);
  const navigate = useNavigate();
  

  const registerUser = useRegister();
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp()
  const {toast} = useToast();
  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      setEmail(values.email);
      const registerData:RegisterData={
        name:values.fullName || "",
        email:values.email,
        phone:values.phoneNumber || "",
        password:values.password,
        role:"user",
      };

      setFormData(registerData);

      const response = await sendOtp.mutateAsync(values.email);
      if(response.status === 201){
        setIsOTPModalOpen(true);
        toast({
          title: "OTP Sent",
          description: "Check your email for the OTP.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP.",
        variant: "destructive",
      })
    } finally{
      setSubmitting(false)
    }
  };
  const resendOtp = async ()=>{
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing.please Try singing up again",
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
  }

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
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-900 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">JOIN THE CLUB</h1>
            <p className="text-gray-400 text-sm">
              Create your account to access premium features and training resources
            </p>
          </div>
          
          {/* Integrate your existing SignupForm component */}
          <SignupForm onSubmit={handleSubmit} />
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                className="flex justify-center items-center py-2 px-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                Google
              </button>
              <button 
                className="flex justify-center items-center py-2 px-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-8 left-8 z-20">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold text-white">ELITE FC</span>
          </div>
        </div>
        <div className="/pexels-tima-miroshnichenko-6078307.jpg">
          <img 
            src="/public/exels-tima-miroshnichenko-6078307.jpg"
            alt="Soccer player with ball" 
            className="object-cover h-full w-full opacity-80"
          />
        </div>
        <div className="absolute bottom-10 left-10 right-10 z-20">
          <h2 className="text-3xl font-bold text-white mb-2">Elevate Your Game</h2>
          <p className="text-gray-300">Join our community of athletes dedicated to excellence both on and off the field.</p>
        </div>
      </div>
    </div>
    <OTPModal
      isOpen={isOTPModalOpen}
      onClose={()=>setIsOTPModalOpen(false)}
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