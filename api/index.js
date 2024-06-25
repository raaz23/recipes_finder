import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';  // Import dotenv as a side effect
import path from "path";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";

import userRouter from "./routers/userRouter.js";
import recipeRouter from "./routers/recipeRouter.js";

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "receipy"
}).then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.log("DB connection failed", err.message);
});

// Router handling
app.use('/api', userRouter); 
app.use('/api', recipeRouter);

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route
app.get("*", (req, res) => {
  res.status(200).json({message:"route not found"});
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
