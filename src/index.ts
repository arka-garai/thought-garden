import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth-routes.js";
import contentRoutes from "./routes/content-routes.js";
import brainRoutes from "./routes/brain-routes.js";

const app = express();
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", brainRoutes);

const PORT = process.env.PORT || 3345;

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
