import { User } from "@prisma/client";
import AppError from "../utils/appError";
import prisma from "../../prisma/client";

class UserService {
    async create({ name, email, password }: Partial<User>) {
        let userExists = await this.findByEmail(email!);
        if (userExists.length > 0) {
            throw new AppError('User already exists', 400);
        }
        const user = await prisma.$queryRaw`
            INSERT INTO "User" (name, email, password)
            VALUES (${name}, ${email}, ${password})
            RETURNING *
        `;
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.$queryRaw`
            SELECT * FROM "User" WHERE email = ${email}
        `;
        return user as User[];
    }

    async findAll() {
        const users = await prisma.$queryRaw`
            SELECT * FROM "User"
        `;
        return users as User[];
    }

    async findById(id: number) {
        const user = await prisma.$queryRaw`
            SELECT * FROM "User" WHERE id = ${id}
        `;
        return user as User[];
    }

    async update({ id, name, email, password }: Partial<User>) {

        let userExists = await this.findById(id!);
        if (userExists.length === 0) {
            throw new AppError('User not found', 404);
        }
        userExists = await this.findByEmailAndId(email!, id!);
        if (userExists.length > 0) {
            throw new AppError('User already exists', 400);
        }

        const user = await prisma.$queryRaw`
            UPDATE "User"
            SET name = ${name}, email = ${email}, password = ${password}
            WHERE id = ${id}
            RETURNING *
        `;
        return user;
    }

    async findByEmailAndId(email: string, id: number) {
        const user = await prisma.$queryRaw`
            SELECT * FROM "User" WHERE email = ${email} AND id != ${id}
        `;
        return user as User[];
    }

    async delete(id: number) {
        const user = await prisma.$queryRaw`
            DELETE FROM "User" WHERE id = ${id}
        `;
        return user;
    }
}

const userService = new UserService();
export default userService;