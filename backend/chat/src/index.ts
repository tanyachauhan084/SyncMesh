import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import chatRoutes from "./routes/chat.js";

const app= express();

dotenv.config();

connectDb();

app.use(express.json());

app.use("/api/v1", chatRoutes);

const port= process.env.PORT;

app.listen(port, ()=>{

console.log(`Serverr is running at ${port}`);
})
