import { Request, Response, NextFunction } from "express";
import response from "../utils/response";
import userService from "../services/user.service";

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const users = await userService.findAll();
        return response(res, 200, {
            message: 'Users found successfully',
            data: users,
            status: true,
        })
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        const user = await userService.create({
            name,
            email,
            password,
        });
        return response(res, 201, {
            message: 'User created successfully',
            data: user,
            status: true,
        });
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const user = await userService.findById(Number(id));
        return response(res, 200, {
            message: 'User found successfully',
            data: user,
            status: true,
        });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await userService.update({
            id: Number(id),
            name,
            email,
            password,
        });
        return response(res, 200, {
            message: 'User updated successfully',
            data: user,
            status: true,
        });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const user = await userService.delete(Number(id));
        return response(res, 200, {
            message: 'User deleted successfully',
            data: user,
            status: true,
        });
    }
}

const userController = new UserController();
export default userController;