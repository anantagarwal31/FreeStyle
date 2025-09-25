import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/be-common/config";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"]??"";

    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;;

    if(decoded){
        req.userId = decoded.userId
        next();
    }
    else{
        res.status(403).json({
            message:"Unauthorized"
        })
    }
}