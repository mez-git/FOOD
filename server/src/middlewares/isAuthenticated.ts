import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
            return; // This ensures no further code is executed after sending the response
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error("Secret key is not defined in environment variables.");
        }

        const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

        if (!decoded || typeof decoded === 'string') {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            });
            return; // Prevents further code execution
        }

        req.id = decoded.userId;
        next();  // Proceed to the next middleware if authenticated
    } catch (error) {
        console.error(error); // Optionally log the error for debugging purposes
        next(error);  // Pass the error to Express error handler
    }
};
