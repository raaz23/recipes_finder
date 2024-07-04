import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";

import userRouter from "./routers/userRouter.js";
import recipeRouter from "./routers/recipeRouter.js";



const app = express();


// Middleware

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin:true,
    credentials: true,
  })
);

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "receipy",
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB connection failed", err.message);
  });

// Router handling
app.use("/api", userRouter);
app.use("/api", recipeRouter);

//yeh sare frontend k liye hai

/*app.use(express.static(path.resolve(__dirname,'client', 'dist')));
const __dirname = dirname(fileURLToPath(import.meta.url));
// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});*/

// Handle undefined routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
