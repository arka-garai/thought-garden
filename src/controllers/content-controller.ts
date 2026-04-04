import type { Request, Response } from "express";
import mongoose from "mongoose";
import { ContentModel, TagModel } from "../models/db-model.js";
import { ContentSchema, DeleteContentSchema } from "../validations/user-validation.js";
import { userMiddleware } from "../middleware/user-middleware.js";

export const addContent = async (req: Request, res: Response) => {
    try {
        const userId = userMiddleware(req);
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const result = ContentSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ errors: result.error.issues.map((i) => i.message) });
        }

        const { type, link, title, tags = [] } = result.data;

        const tagDocs = await TagModel.find({ title: { $in: tags } });
        const existingTagTitles = tagDocs.map((t) => t.title);
        const newTags = tags.filter((t) => !existingTagTitles.includes(t));

        if (newTags.length > 0) {
            await TagModel.insertMany(newTags.map((t) => ({ title: t })));
        }

        const allTags = await TagModel.find({ title: { $in: tags } });

        await ContentModel.create({
            link,
            type,
            title,
            tags: allTags.map((t) => t._id),
            userId: new mongoose.Types.ObjectId(userId)
        });

        return res.status(200).json({ message: "Content added" });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getContent = async (req: Request, res: Response) => {
    try {
        const userId = userMiddleware(req);
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const content = await ContentModel.find({ userId: new mongoose.Types.ObjectId(userId) })
            .populate("tags")
            .lean();

        const formatted = content.map((c) => ({
            id: c._id,
            type: c.type,
            link: c.link,
            title: c.title,
            tags: (c.tags as unknown as { title: string }[]).map((t) => t.title)
        }));

        return res.status(200).json({ content: formatted });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const userId = userMiddleware(req);
        if (!userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const result = DeleteContentSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({ errors: result.error.issues.map((i) => i.message) });
        }

        const { contentId } = result.data;
        const content = await ContentModel.findOne({ _id: contentId });

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        if (content.userId.toString() !== userId) {
            return res.status(403).json({ message: "Trying to delete a doc you don't own" });
        }

        await ContentModel.deleteOne({ _id: contentId });
        return res.status(200).json({ message: "Deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};
