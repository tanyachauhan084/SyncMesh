import express from "express";
import dotenv from "dotenv";
import { startSendOptConsumer } from "./consumer.js";

dotenv.config();


const app= express()

startSendOptConsumer();

app.listen(process.env.PORT, ()=>{


    console.log(`server is running on port: ${process.env.PORT}`)
})

