import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import {  useNavigate,useParams } from "react-router-dom";
import { toast } from "sonner";
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const { resetToken } = useParams();  
    console.log("Reset token from URL:", resetToken);

    const {loading,resetPassword}=useUserStore()
    const navigate=useNavigate()
        const submitHandler = async (e: any) => {
          e.preventDefault()
          if (!resetToken) {
            toast.error("yaarrr.");
            return;
        }
         
                // Log before calling signup API
                console.log("Calling login API with input:",newPassword);
        
                
                // Login API implementation start here
                try {
                  await resetPassword(resetToken,newPassword);
                  console.log("password reset successfull!");
                  setNewPassword("");
                  navigate('/login')
              } catch (error) {
                  console.log(" error:", error);
              }
              
        }
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={submitHandler} className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password to reset old one</p>
        </div>
        <div className="relative w-full">
            <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
            />
            <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none"/>
        </div>
        {
            loading ? (
                <Button disabled className="bg-teal-600 hover:bg-teal-500"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</Button>
            ) : (
                <Button className="bg-teal-600 hover:bg-teal-500">Reset Password</Button>
            )
        }

      </form>
    </div>
  );
};

export default ResetPassword;