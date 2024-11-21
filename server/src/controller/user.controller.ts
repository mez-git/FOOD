import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto"; 
import cloudinary from "../utils/cloudinary";

import { generateToken } from "../utils/generateToken"

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
             res.status(400).json({
                success: false,
                message: "User already exist with this email"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    

        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            
            
        })
        generateToken(res,user);

     

        const userWithoutPassword = await User.findOne({ email }).select("-password");
         res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
         res.status(500).json({ message: "Internal server error" })
    }
};
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
             res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
            return
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
             res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        generateToken(res, user);
        user.lastLogin = new Date();
        await user.save();

        // send user without passowrd
        const userWithoutPassword = await User.findOne({ email }).select("-password");
         res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword
        });
    } catch (error) {
        console.log(error);
         res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (_: Request, res: Response) => {
    try {
         res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log(error);
     res.status(500).json({ message: "Internal server error" })
    }
};


export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
             res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };
         res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: "Internal server error" });
    }
};
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const { fullname, email, address, city, country, profilePicture } = req.body;
        // upload image on cloudinary
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedData = {fullname, email, address, city, country, profilePicture};

        const user = await User.findByIdAndUpdate(userId, updatedData,{new:true}).select("-password");

         res.status(200).json({
            success:true,
            user,
            message:"Profile updated successfully"
        });
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: "Internal server error" });
    }
}

