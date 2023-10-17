
import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import userController from "../controller/user.controller";
import joiAsyncMiddleWare from "../middlewares/joiMiddleware";
import { userSchema } from "../validators/userValidations";

const router = Router();

router.route('/')
    .get(asyncHandler(userController.getAll))
    .post(
        joiAsyncMiddleWare(userSchema),
        asyncHandler(userController.create));

router.route('/:id')
    .get(asyncHandler(userController.getOne))
    .put(
        joiAsyncMiddleWare(userSchema),
        asyncHandler(userController.update))
    .delete(asyncHandler(userController.delete));

export default router;

