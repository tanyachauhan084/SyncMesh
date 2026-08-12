import mongoose from "mongoose"

const  connectDb= async()=>{

    const url= process.env.MONGO_URI;

    if(!url){

        throw new Error("MONGO_URI is not defined in enviroment variable");
    }

    try{

        await mongoose.connect(url,{

            dbName:"SyncMesh",
        } );


        console.log("connected to mongodb");

    }

    catch(error){

        console.log("Failed to connect to Mongodb", error);
        process.exit(1);
    }
};




export default connectDb;