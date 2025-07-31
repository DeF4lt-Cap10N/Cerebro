import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in env");
    }
    const decoded = jwt.verify(header as string, process.env.JWT_SECRET);

    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message:"You are not logged in"
        })
    }
}