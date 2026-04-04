import type { Request, Response } from "express";
import { UserModel } from "../models/db-model.js";
import { SignupSchema, SigninSchema } from "../validations/user-validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const signup = async (req: Request, res: Response) => {
    try {
        const result = SignupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ errors: result.error.issues.map((i) => i.message) });
        }

        const { username, password } = result.data;

        const existing = await UserModel.findOne({ username });
        if (existing) {
            return res.status(403).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        await UserModel.create({ username, password: hashedPassword });
        return res.status(200).json({ message: "Signed up" });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const result = SigninSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ errors: result.error.issues.map((i) => i.message) });
        }

        const { username, password } = result.data;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(403).json({ message: "Wrong email password" });
        }

        const valid = await comparePassword(password, user.password);
        if (!valid) {
            return res.status(403).json({ message: "Wrong email password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_PASSWORD as string);
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
