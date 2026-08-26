import { generatetoken } from "../config/generateToken.js"
import { publishToQueue } from "../config/rabbitmq.js"
import TryCatch from "../config/TryCatch.js"
import { redisClient } from "../index.js"
import { User } from "../model/User.js"

export const loginUser =  TryCatch(async(req, res)=>{

    const {email}= req.body

    const rateLimitKey= `otp:ratelimit${email}`

    const rateLimit= await redisClient.get(rateLimitKey);



    if(rateLimit){ 
    res.status(429).json({ 
        
        messgae:"Too many requests. Please wait before requesting for a new otp",
    
    });
    
    return;

}

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


export const verifyuser= TryCatch(async(req, res)=>{

    const {email, otp:enteredotp}= req.body


    if(!email || enteredotp){

        res.status(400).json({

            message: "Email and otp required",

        }) 
        return;
    }

    const otpKey= `otp:${email}`

    const storedotp= await redisClient.get(otpKey)

    if(!storedotp || storedotp !== enteredotp){

        res.status(400).json({

            message:"Invalid or expired otp"
        })


        return;
    }


    await redisClient.del(otpKey)
    


     let user= await User.findOne({email})

    if(!user){
        const name= email.slice(0,8)

        user= await User.create({name, email});

    }


const token= generatetoken(user);

res.json({

    messgae:"user verififed",
    user,
    token
})
})