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
            return;
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as jwt.JwtPayload;

        // Check if decoding was successful
        if (!decoded || typeof decoded === 'string') {
            res.status(401).json({
                success: false,
                message: "Invalid token"
            });
            return;
        }

        // Assign the decoded user ID to req.id
        req.id = decoded.userId;
        next();
    } catch (error) {
        next(error);  // Pass error to Express error handler
    }
};
