import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { createClient } from "redis";

dotenv.config();


connectDb();

export const redisClient= createClient({
    url: process.env.REDIS_URL as string,
});


redisClient.connect()
.then(()=> console.log("connected to redis"))
.catch(console.error);


const app= express();

const port= process.env.PORT;

app.listen(port, ()=>{

    console.log(`server is running om port ${port}`);
})