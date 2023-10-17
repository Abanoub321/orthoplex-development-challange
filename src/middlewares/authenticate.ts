import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import prisma from "../../prisma/client";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
        }
        if (!token) {
            return next(new AppError("No Token Provided", 401));
        }
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return next(new AppError("Unauthorized", 401));
        }
        (req as any).user = user.id;
        next();
    } catch (error) {
        next(new AppError("Invalid Token", 401));
    }
};