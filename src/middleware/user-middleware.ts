import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";

interface MyPayload extends JwtPayload {
    userId: Types.ObjectId;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string | import("mongoose").Types.ObjectId;
        }
    }
}

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = parts[1];

    try {
        const JWT_SECRET = process.env.JWT_USER_PASSWORD as string;

        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string") {
            return res.status(403).json({ message: "Invalid token" });
        }

        const payload = decoded as MyPayload;

        if (!payload.userId) {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        req.userId = payload.userId;

        next();
    } catch {
        return res.status(403).json({ message: "Unauthorized" });
    }
};
