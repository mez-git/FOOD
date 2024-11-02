import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";

import { Loader2, LockKeyhole, Mail ,User,PhoneOutgoing} from "lucide-react";
import {ChangeEvent, useState,FormEvent } from "react";

import  {Link} from "react-router-dom";



const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname:"",
    email:"",
    password:"", 
    contact:"", 

  });
  const [errors,setErrors]=useState<Partial<SignupInputState>>({})
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

const loading=false
const signupSubmitHandler = async (e: FormEvent) => {
  e.preventDefault()
  const result =userSignupSchema.safeParse(input)
  if(!result.success){
    const fieldError= result.error.formErrors.fieldErrors
    setErrors(fieldError as Partial<SignupInputState>);
    return
  }
//api implementation
}



  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">FOOD</h1>
        </div>
        <div className="mb-4">
        <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.fullname}</span>}

          </div>
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
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.contact}</span>}

          </div>
          </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full bg-teal-600  hover:bg-teal-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 "
            >
              SignUp
            </Button>
          )}
          <div className="mt-4">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Already have an account!{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;