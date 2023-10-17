import { Router } from "express";
import userRouter from "./user.router";
import authenticate from "../middlewares/authenticate";

const AppRouter = Router();

// AppRouter.use(authenticate); // should be used before all routes that need authentication (all routes except /auth)
AppRouter.use('/users', userRouter);



export default AppRouter;