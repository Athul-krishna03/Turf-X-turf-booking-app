import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "@/store/slices/user.slice";
import { useLogin, useGoogleAuth } from "@/hooks/auth/useAuth";
import { useToast } from "../hooks/useToast";
import { CredentialResponse } from "@react-oauth/google";

const Login = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useLogin();
  const googleLogin = useGoogleAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginUser.mutateAsync(values);
        if (response.status === 200) {
          dispatch(userLogin(response.data.user));
          navigate("/dashboard");
          toast({
            title: "Success!",
            description: "Login successful!",
            duration: 3000,
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to login.",
          variant: "destructive",
          duration: 3000,
        });
      }
    },
  });

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
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 bg-black text-white p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2 text-center md:text-left">LOGIN</h1>
          <p className="text-sm text-gray-400 mb-8">Welcome back, join for the game</p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                id="email"
                name="email"
                placeholder="Email"
                className="pl-10 bg-transparent border-gray-700 text-white"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="pl-10 bg-transparent border-gray-700 text-white"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              Login Now
            </Button>
          </form>

          <div className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <Separator className="flex-1 bg-gray-700" />
              <span className="text-sm text-gray-400">Login with Others</span>
              <Separator className="flex-1 bg-gray-700" />
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-green-800 text-white bg-black"
                onClick={() =>
                  toast({
                    title: "Google login",
                    description: "Google authentication would happen here",
                  })
                }
              >
                <GoogleIcon className="mr-2 h-4 w-4" />
                Login with Google
              </Button>

              <Button
                variant="outline"
                className="w-full border-green-800 text-white bg-black"
                onClick={() =>
                  toast({
                    title: "Facebook login",
                    description: "Facebook authentication would happen here",
                  })
                }
              >
                <FacebookIcon className="mr-2 h-4 w-4" />
                Login with Facebook
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-[#4CAF50] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign Up
            </a>
          </p>
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

// Reusable Icon Components
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 512 512" stroke="currentColor" strokeWidth="0">
    <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
  </svg>
);

export default Login;
