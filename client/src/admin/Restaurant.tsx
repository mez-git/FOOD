import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { RestaurantFormSchema, restaurantFromSchema } from "@/schema/restaurantSchema";
import { useState,FormEvent, useEffect } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
const Restaurant = () => {
    const[input,setInput]=useState<RestaurantFormSchema>({
        restaurantName:"",
        city:"",
        country:"",
        deliveryTime:0,
        cuisines:[],
        imageFile:undefined
    })
    const {
      loading,
      restaurant,
      updateRestaurant,
      createRestaurant,
      getRestaurant,
    } = useRestaurantStore();
  
    const [errors,setErrors]=useState<Partial<RestaurantFormSchema>>({})
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) : value });
      };
      const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    const result=restaurantFromSchema.safeParse(input)
    if(!result.success){
        const fieldErrors=result.error.formErrors.fieldErrors;
        setErrors(fieldErrors as Partial<RestaurantFormSchema>)
    }
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }
console.log(formData)
    
        // create
        if (restaurant) {
          // update
          await updateRestaurant(formData);
        } else {
          // create
          await createRestaurant(formData);
        }  
      
    } catch (error) {
      console.log(error);
    }

    }
    
  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if(restaurant){
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      };
      }
    fetchRestaurant();
    console.log(restaurant);
    
  }, []);
    
  
  
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
        <form onSubmit={submitHandler}>
          <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
            <div>
              <Label>Restaurant Name</Label>
              <Input
                type="text"
                name="restaurantName"
                value={input.restaurantName}
                onChange={changeEventHandler}

                placeholder="Enter your restaurant name."
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={input.city}
                onChange={changeEventHandler}

                placeholder="Enter your city name."
              />
                              {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.restaurantName}
                  </span>
                )}

            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={changeEventHandler}

                placeholder="Enter your country name"
              />
                              {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>
                )}

            </div>
            <div>
              <Label>Delivery Time</Label>
              <Input
                type="number"
                name="deliveryTime"
                value={input.deliveryTime}
                onChange={changeEventHandler}

                placeholder="Ente delivery time."
              />
                              {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}

            </div>
            <div>
              <Label>Cuisines</Label>
              <Input type="text"
               name="cuisines"
              value={input.cuisines} 
              onChange={(e) =>
                setInput({ ...input, cuisines: e.target.value.split(",") })
              }

              placeholder="Enter cuisines" />
                    {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>
                )}
            </div>
            <div>
              <Label>Upload Restaurant Banner</Label>
              <Input 
             onChange={(e) =>
                 setInput({
                        ...input,
                        imageFile: e.target.files?.[0] || undefined,
                        })
                     }
                
              type="file" 
              name="imageFile" 
               accept="image/*" />
                      {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.imageFile?.name}
                  </span>
                )}
            </div>
            <div className="my-5 w-fit">
            {loading ? (
              <Button
                disabled
                className="bg-teal-600 hover:bg-teal-500 rounded"
              >
                <Loader2 className="mr-2 h-4 w-4animate-spin" />
                please wait.
              </Button>
            ) : (
              <Button className="bg-teal-600 hover:bg-teal-500 rounded">
                {restaurant
                  ? "Upadate your restaurant details"
                  : "       Add your restaurant"}
              </Button>
            )}
            </div>
       
          </div>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;
