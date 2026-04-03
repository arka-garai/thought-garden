import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", (req, res) => {

})
app.post("/api/v1/signin", (req, res) => {

})
app.post("/api/v1/content", (req, res) => {

})
app.get("/api/v1/content", (req, res) => {

})
app.delete("/api/v1/content", (req, res) => {

})
app.post("/api/v1/brain/share", (req, res) => {

})
app.post("/api/v1/brain/:shareLink", (req, res) => {

})

const PORT = process.env.PORT || 3000;

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();


