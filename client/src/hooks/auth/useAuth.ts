import {useMutation} from  '@tanstack/react-query'
import { registeUser,sendOtp,verifyOtp,loginUser} from '../../services/auth/authServices'
import { RegisterData ,LoginData} from '../../types/Type'



export const useRegister = ()=>{
    return useMutation({
        mutationFn:(data:RegisterData)=> registeUser(data),
        onError:(error:Error) =>{
            console.error("Registration Error",error)
        }
    });
};

export const useSendOtp = ()=>{
    return useMutation({
        mutationFn:(email:string)=> sendOtp(email),
        onError:(error:Error)=>{
            console.error("Sending OTP Error",error)
        }
    })
}
export const useVerifyOtp = () => {
    return useMutation({
      mutationFn: ({ email, otp }: { email: string; otp: string }) => verifyOtp(email, otp),
      onError: (error: Error) => {
        console.error("OTP Verification Error", error);
      },
    });
  };

  export const useLogin = ()=>{
    return useMutation({
      mutationFn:(data:LoginData)=>loginUser(data),
      onError:(error:Error)=>{
        console.log("Error on login user",error)
      }
    })
  }