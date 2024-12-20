import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

import { Loader2, LockKeyhole, Mail } from "lucide-react";
import {ChangeEvent, useState,FormEvent } from "react";

import  {Link, useNavigate} from "react-router-dom";


const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors,setErrors]=useState<Partial<LoginInputState>>({})
  const { login, loading } = useUserStore();
const navigate=useNavigate()
  // Log the current loading state
  console.log("Loading state:", loading);
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log("Input state after change:", input);
  };


const loginSubmitHandler = async (e: FormEvent) => {
  e.preventDefault()
  //form validation check
  console.log("Input state before validation:", input);
  const result =userLoginSchema.safeParse(input)

 if (!result.success)
  { const fieldErrors=result.error.formErrors.fieldErrors
    setErrors(fieldErrors as Partial<LoginInputState>)}
 
        // Log before calling signup API
        console.log("Calling login API with input:", input);

        
        // Login API implementation start here
        try {
          await login(input);
          navigate("/");
        } catch (error) {console.log(error);
        }
      
}



  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">FOOD</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}

              
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.email}</span>}

          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}

              
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.password}</span>}

          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full  bg-teal-600  hover:bg-teal-500 rounded ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full  bg-teal-600  hover:bg-teal-500 roundeds  "
            >
              Login
            </Button>
          )}
       
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;