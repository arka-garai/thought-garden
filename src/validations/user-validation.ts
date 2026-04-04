import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(10, "Username must be at most 10 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
});

export const SigninSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
});

export const ContentSchema = z.object({
    type: z.enum(["document", "tweet", "youtube", "link"]),
    link: z.string().url(),
    title: z.string().min(1),
    tags: z.array(z.string()).optional()
});

export const DeleteContentSchema = z.object({
    contentId: z.string()
});

export const ShareGardenSchema = z.object({
    share: z.boolean()
});
