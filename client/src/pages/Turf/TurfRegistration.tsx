import React, { useState } from "react";
import axios from "axios";
import { TurfFormValues } from "../../types/Type";
import {
  useRegister,
  useSendOtp,
  useVerifyOtp,
} from "../../hooks/auth/useAuth";
import { useToast } from "../../hooks/useToast";
import OTPModal from "../../components/modals/OTPmodal";
import { useNavigate } from "react-router-dom";
import TurfRegisterForm from "../../components/auth/TurfSignup";
const CLOUDINARY_CLOUD_NAME = "dlvudhlgl";
const CLOUDINARY_UPLOAD_PRESET = "turf_images";
const TurfRegistrationForm: React.FC = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sendOtp = useSendOtp();
  const { toast } = useToast();
  const registerTurf = useRegister();
  const verifyOtp = useVerifyOtp();
  const navigate = useNavigate();
  const handleSubmit = async (
    values: TurfFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setSubmitting(true);
      const uploadPromises = values.turfPhotos.map((photo) =>
        uploadToCloudinary(photo)
      );
      const uploadedUrls = await Promise.all(uploadPromises);
      const formDataWithUrls = {
        ...values,
        role: "TurfOwner",
        turfPhotos: uploadedUrls,
      };
      console.log(formDataWithUrls);
      setFormData(formDataWithUrls);
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
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Email is missing. Please try signing up again",
        variant: "destructive",
    });
        return;
    }
    try {
    setIsLoading(true);
    const response = await sendOtp.mutateAsync(formData.email);
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
    const email = formData.email;
    try {
      setIsLoading(true);
      const optResponse = await verifyOtp.mutateAsync({ email, otp });
      console.log("otp response", optResponse);

      if (optResponse) {
        console.log("verify OTP");
        await registerTurf.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Account created successfully! 🎉",
        });
        navigate("/turf/login");
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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Turf Registration</h1>
            <p className="text-gray-400">
              Join our network of premium turf facilities
            </p>
          </div>

          <TurfRegisterForm onSubmit={handleSubmit} />
        </div>
      </div>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onResend={resendOtp}
        onVerify={handleVerifyOtp}
        isLoading={isLoading}
        title="Verify your Email"
        subtitle={`We've sent a 6-digit code to email. Enter it below to verify your account.`}
      />
    </>
  );
};

export default TurfRegistrationForm;
