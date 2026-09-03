import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";

const app= express();

dotenv.config();

connectDb();

const port= process.env.PORT;

app.listen(port, ()=>{

console.log(`Serverr is running at ${port}`);
})
