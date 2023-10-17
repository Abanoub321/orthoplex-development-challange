import { Response } from "express";


export default (res: Response, statusCode: number, data: AppResponseType) => {
    res.status(statusCode).json(data);
};