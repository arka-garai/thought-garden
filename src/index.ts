import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth-routes.js";
import contentRouter from "./routes/content-routes.js";
import gardenRouter from "./routes/garden-routes.js";

const app = express();
app.use(express.json());

app.use("/api/v1", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/garden", gardenRouter);

const PORT = process.env.PORT || 3345;

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();
