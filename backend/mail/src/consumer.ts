import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';


dotenv.config();

export const startSendOptConsumer= async()=>{

    try {
        
        const connection= await amqp.connect({
                protocol:"amqp",
                hostname: process.env.RABBITMQ_HOST!,
                port:5672,
                username: process.env.RABBITMQ_USERNAME!,
                

                password: process.env.RABBITMQ_PASSWORD!

        })



        const channel= await connection.createChannel()




        const queueName= "second-otp"



        await channel.assertQueue(queueName, {durable:true});


        console.log("Mail service consumer started, listening for otp emails");


     
    } catch (error) {
        console.log("Failed to start rabbitmq consumer", error);
    }
}





