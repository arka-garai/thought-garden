import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    
    const token = parts[1] as string;
    try {
        const JWT_SECRET = process.env.JWT_USER_PASSWORD || "secret";
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
