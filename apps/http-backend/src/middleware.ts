import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

export   function  middleware (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["autherization"]  ;
    const token = typeof authHeader === "string" ? authHeader : "";

    const decode = jwt.verify(token,JWT_SECRET)

    if(decode) {
        // @ts-ignore
            req.userId = decode.userId
            next()
    }else{
         res.status(403).json({
            message: "Unauthorized"
         })
       }
        
        
}