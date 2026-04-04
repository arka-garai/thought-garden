import type { Request, Response } from "express";
import mongoose from "mongoose";
import { ContentModel, LinkModel, UserModel } from "../models/db-model.js";
import { ShareBrainSchema } from "../validations/user-validation.js";

export const shareBrain = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        const result = ShareBrainSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ errors: result.error.issues.map((i) => i.message) });
        }

        const { share } = result.data;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        if (share) {
            const existing = await LinkModel.findOne({ userId: userObjectId });
            if (existing) {
                return res.status(200).json({ link: existing.hash });
            }

            const hash = Math.random().toString(36).substring(2);
            await LinkModel.create({ hash, userId: userObjectId });
            return res.status(200).json({ link: hash });
        } else {
            await LinkModel.deleteOne({ userId: userObjectId });
            return res.status(200).json({ message: "Sharing disabled" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getSharedBrain = async (req: Request, res: Response) => {
    try {
        const shareLinkParam = req.params.shareLink as string;
        const link = await LinkModel.findOne({ hash: shareLinkParam });

        if (!link) {
            return res.status(404).json({ message: "Invalid share link" });
        }

        const user = await UserModel.findById(link.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const content = await ContentModel.find({ userId: link.userId })
            .populate("tags")
            .lean();

        const formatted = content.map((c) => ({
            id: c._id,
            type: c.type,
            link: c.link,
            title: c.title,
            tags: (c.tags as unknown as { title: string }[]).map((t) => t.title)
        }));

        return res.status(200).json({ username: user.username, content: formatted });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};
