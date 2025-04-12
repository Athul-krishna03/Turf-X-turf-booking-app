import React, { useState, useRef, useEffect } from "react";
import { X, AlertTriangle, Check, Loader2, Timer } from "lucide-react";
import { useToast } from "../../hooks/useToast"

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend:()=>void;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  otpLength?: number;
}

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  onResend,
  isLoading = false,
  title = "Verification Code",
  subtitle = "Enter the 6-digit code sent to your device",
  otpLength = 6,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();


  useEffect(() => {
    if (isOpen) {
      setOtp(Array(otpLength).fill(""));
      setErrorMessage("");
      setActiveInput(0);
      setTimeLeft(60);
      setCanResend(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [isOpen, otpLength]);


  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);


  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;
    

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    setErrorMessage("");


    if (value && index < otpLength - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (index === otpLength - 1 && value && !newOtp.includes("")) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }

    else if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === "ArrowRight" && index < otpLength - 1) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    

    if (!/^\d+$/.test(pastedData)) {
      setErrorMessage("Please paste numbers only");
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < Math.min(pastedData.length, otpLength); i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    

    const nextIndex = Math.min(pastedData.length, otpLength - 1);
    setActiveInput(nextIndex);
    inputRefs.current[nextIndex]?.focus();
    

    if (!newOtp.includes("") && newOtp.length === otpLength) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleVerify = (otpValue: string) => {
    onVerify(otpValue);
  };


  const handleResendOTP = () => {
    if (!canResend && timeLeft > 0) return;

    if(onResend){
        onResend();
    }
    
    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your Email.",
      duration: 3000,
    });

    setTimeLeft(60);
    setCanResend(false);
  };


  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="fixed inset-0 bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div 
        className="relative w-full max-w-md bg-[#1e1e1e] p-6 rounded-xl shadow-2xl border border-[#2a2a2a] animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a8a8a] hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-[#8a8a8a]">{subtitle}</p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: otpLength }).map((_, index) => (
            <input
              key={index}
              type="text"
              ref={el => {
                inputRefs.current[index] = el
              }}
              value={otp[index]}
              onChange={e => handleChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-12 h-14 text-center text-xl rounded bg-[#0a0a0a] text-white border-2 
              ${index === activeInput ? 'border-[#3cea94]' : 'border-transparent'} 
              focus:border-[#3cea94] focus:outline-none transition-all duration-200`}
              maxLength={1}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {errorMessage && (
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertTriangle size={16} className="mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleVerify(otp.join(""))}
            disabled={otp.includes("") || isLoading}
            className={`w-full bg-[#3cea94] text-black font-medium py-3 rounded-md flex items-center justify-center
              ${otp.includes("") || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 transition-opacity'}`}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Check size={18} className="mr-2" />
                Verify Code
              </>
            )}
          </button>
          
          <button
            onClick={handleResendOTP}
            disabled={!canResend && timeLeft > 0 || isLoading}
            className={`w-full bg-transparent border border-[#2a2a2a] text-[#8a8a8a] py-3 rounded-md transition-colors
              ${!canResend && timeLeft > 0 || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:border-white'}`}
          >
            {!canResend && timeLeft > 0 ? `Resend Code (${formatTime(timeLeft)})` : 'Resend Code'}
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-[#8a8a8a] flex items-center justify-center">
          <Timer size={16} className="mr-2" />
          {canResend ? (
            <span>Code has expired. Please request a new one.</span>
          ) : (
            <span>Code expires in <span className="text-white font-medium">{formatTime(timeLeft)}</span></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPModal;