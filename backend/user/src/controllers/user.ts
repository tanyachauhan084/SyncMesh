import { publishToQueue } from "../config/rabbitmq.js"
import TryCatch from "../config/TryCatch.js"
import { redisClient } from "../index.js"

export const loginUser =  TryCatch(async(req, res)=>{

    const {email}= req.body

    const rateLimitKey= `otp:ratelimit${email}`

    const rateLimit= await redisClient.get(rateLimitKey);


    const otp= Math.floor(100000 + Math.random()* 900000).toString()


    const otpKey= `otp:${email}`

    await redisClient.set(otpKey, otp, {

        EX: 300,
    })

    await redisClient.set(rateLimitKey, "true", {

        EX:60,

    })


    const message= {

        to:email,
        subject: "your otp code",
        body: `You otp is ${otp}. It is valid for 5 minutes`
    };

    await publishToQueue("send-otp", message)

    res.status(200).json({

        message:"OTP send to your mail",
    })
})