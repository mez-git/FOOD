
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

import { useNavigate } from "react-router-dom";
import HeroImage from "../assets/Paneer.jpeg"
const AvailableMenu = () => {
  
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {["Briyani","Burger","Jalebi"].map((cuisine: string, idx: number) => (
          <Card key={idx} className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <img src={HeroImage} alt="" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {cuisine}
              </h2>
              <p className="text-sm text-gray-600 mt-2">something about the food ..basically description.</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹ 400</span>
              </h3>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  
                  navigate("/cart");
                }}
                className="w-full bg-teal-600 hover:bg-teal-500"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;