import FormikLoginForm from "../../components/auth/LoginForm";
import { LoginData as FormValues } from "../../types/Type";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { turfLogin } from "../../store/slices/turf.slice";
import { useLogin } from "../../hooks/auth/useAuth";
import { useToast } from "../../hooks/useToast";

const TurfLoginPage = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginTurf= useLogin();

  const handleSubmit = async (values: FormValues) => {
    try {
      console.log(values);
      const response = await loginTurf.mutateAsync(values);
      console.log("TURFLogin", response);
      if (response.status === 200) {
        console.log("Turf Logged in");
        dispatch(turfLogin(response.data.user));
        navigate("/turf/dashboard");
        toast({
          title: "Success!",
          description: "login successful!",
          duration: 3000,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login as admin.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 bg-black text-white p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          
          <FormikLoginForm onSubmit={handleSubmit} userType='turf' />
          
          </div>
          <p className="text-center mt-8 text-sm text-[#8E9196]">
            Don't have an account?{" "}
            <Link to="/turf/signup" className="text-[#3BE188] hover:underline">
            Create an account
            </Link>
      </p>
      </div>

      {/* Right Panel - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/turf.jpg')",
        }}
      ></div>   


      
    </div>
  );
};

export default TurfLoginPage;