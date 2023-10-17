import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import response from "../utils/response";
export default (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "development") {
        response(res, err.statusCode, { status: false, message: err.message, stack: err.stack })
    } else {
        response(res, err.statusCode, { status: false, message: err.message })
    }
}