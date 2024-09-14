import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoute from "./router/product.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000; // Default to port 4000 if not specified in .env

app.use("/api/product", productRoute);

app.listen(port, () => {
    connectDB().then(() => {
        console.log(`Server connected on http://localhost:${port}`);
    }).catch(err => {
        console.error("Failed to connect to the database:", err);
    });
});
