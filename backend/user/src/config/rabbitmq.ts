import amqp from 'amqplib'

let channel: amqp.Channel;

export const connnectRabbitMQ= async()=>{

    try{

        const  connection= await amqp.connect({

            protocol: "amqp",
            hostname: process.env.RABBITMQ_HOST!,
            port: 5672,
            username: process.env.RABBITMQ_USERNAME!,
            password: process.env.RABBITMQ_PASSWORD!,
        });



        channel= await connection.createChannel();

        console.log("connected to rabbitmq");

    }  catch(error){

        console.log("failed to connect to  rabbitmq", error);
    }
}

