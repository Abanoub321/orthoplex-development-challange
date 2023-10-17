import { User } from "@prisma/client";
import Joi from "joi";

export const userSchema = Joi.object<User>({}).keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});