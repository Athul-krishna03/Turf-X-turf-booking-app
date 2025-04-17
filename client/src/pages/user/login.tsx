
import FormikLoginForm from "../../components/auth/LoginForm";
import { LoginData as FormValues } from "../../types/Type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/slices/user.slice";
import { useLogin, useGoogleAuth } from "../../hooks/auth/useAuth";
import { useToast } from "../../hooks/useToast";
import { CredentialResponse } from "@react-oauth/google";

const Login = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useLogin();
  const googleLogin = useGoogleAuth();

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log(values)
     const response = await loginUser.mutateAsync(values);
     console.log("userLogin",response);
     if(response.status === 200){
      console.log("User Logged in");
      dispatch(userLogin(response.data.user))
      navigate("/dashboard")
      toast({
        title: "Success!",
        description: "Login successful!",
        duration: 3000,
      });
     }
    } catch (error:any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login.",
        variant: "destructive",
        duration: 3000,
      });
      return
    }  

  };
  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    console.log("login")
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
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 bg-black text-white p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">

          <FormikLoginForm 
              onSubmit={handleSubmit} 
              onGoogleLogin={handleGoogleLogin} 
            />

        </div>
      </div>

      {/* Right Panel - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('\\vecteezy_ai-generated-soccer-match-on-the-field_42054042.jpg')",
        }}
      ></div>
    </div>
  );
};
export default Login;
