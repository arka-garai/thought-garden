import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface MyPayload extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(403).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD!) as MyPayload;

        if (!decoded.userId) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
