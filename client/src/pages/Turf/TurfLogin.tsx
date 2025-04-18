import FormikLoginForm from "../../components/auth/LoginForm";
import { LoginData as FormValues } from "../../types/Type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { adminLogin } from "../../store/slices/admin.slice";
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
        // dispatch(adminLogin(response.data.admin));
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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-xl border border-green-500">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="bg-green-500 h-1 w-16 mx-auto mb-8"></div>
          
          <FormikLoginForm onSubmit={handleSubmit} userType='turf' />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Administrative access only</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TurfLoginPage;