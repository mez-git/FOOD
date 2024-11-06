import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const {loading,forgotPassword}=useUserStore()
const navigate=useNavigate()
    const submitHandler = async (e: any) => {
      e.preventDefault()
    
     
            // Log before calling signup API
            console.log("Calling login API with input:", email);
    
            
            // Login API implementation start here
            try {
              await forgotPassword(email);
            
              setEmail("");
              navigate('/login')
          } catch (error) {
              console.log(" error:", error);
          }
          
    }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={submitHandler} className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
        </div>
        <div className="relative w-full">
            <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {
            loading ? (
                <Button disabled className="bg-teal-600 hover:bg-teal-500"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
            ) : (
                <Button  type="submit" className="bg-teal-600 hover:bg-teal-500">Send Reset Link</Button>
            )
        }
        <span className="text-center">
            Back to{" "}
            <Link to="/login" className="text-blue-500">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
//Fyol1D