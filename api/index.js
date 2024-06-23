import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import env from "dotenv/config";
import path from "path";

const app=express();

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to MongoDB");
})

app.get("/*", async ()=>{
    res.sendFile(path.join(__dirname, "index.html"));
})
const port= process.env.PORT || 3005;
app.listen(port,()=>{
    console.log("server is running at port ", port);

});

