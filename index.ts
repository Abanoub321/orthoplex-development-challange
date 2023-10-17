import express from 'express';
import { config } from "dotenv"
config();
import router from "./src/routers"
import globalError from "./src/middlewares/errorMiddleware"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router);

app.use(globalError);

app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});