import { Response } from "express";
import AppResponseType from "../types/responseType";

export default (res: Response, statusCode: number, data: AppResponseType) => {
    res.status(statusCode).json(data);
};