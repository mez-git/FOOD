import {z} from "zod";

export const restaurantFromSchema = z.object({
    restaurantName:z.string().min(1,{message:"Restaurant name is required"}),
    city:z.string().min(1,{message:"City is required"}),
    country:z.string().min(1,{message:"Country is required"}),
    deliveryTime:z.number().min(0, {message:"Delivery time can not be negative"}),
    cuisines:z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),
});

export type RestaurantFormSchema = z.infer<typeof restaurantFromSchema>;