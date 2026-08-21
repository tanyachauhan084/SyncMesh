import {
    type Request,
    type Response,
    type RequestHandler,
    type NextFunction
} from "express";


const TryCatch= (handler: RequestHandler):RequestHandler=>{

    return async(req:Request, res: Response, next: NextFunction)=>{

        try {
            
        } catch (error) {



            res.status(500).json({

                message: (error as Error).message,
            })
            
        }
    }
}




export default TryCatch;
