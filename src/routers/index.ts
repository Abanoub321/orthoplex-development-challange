import { Router } from "express";
import userRouter from "./user.router";

const AppRouter = Router();

AppRouter.use('/users', userRouter);



export default AppRouter;