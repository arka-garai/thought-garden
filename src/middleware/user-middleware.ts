import type { Request } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (req: Request): string | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    const parts = authHeader.split(" ");
    if (parts.length !== 2) return null;
    const token = parts[1] as string;
    try {
        const JWT_SECRET = process.env.JWT_USER_PASSWORD || "secret";
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string };
        return decoded.userId;
    } catch {
        return null;
    }
};
