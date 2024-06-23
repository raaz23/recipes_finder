import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';  // Import dotenv as a side effect
import path from "path";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use express's built-in body-parser

// Database connection
mongoose.connect("mongodb+srv://receipy:receipy@cluster0.ttbptc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/receipy_finder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.log("DB connection failed", err.message);
});

// Routes
app.get("/*", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
