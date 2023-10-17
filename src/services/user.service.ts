import { User } from "@prisma/client";
import AppError from "../utils/appError";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";

class UserService {
    async create({ name, email, password }: Partial<User>) {
        let userExists = await this.findByEmail(email!);
        if (userExists.length > 0) {
            throw new AppError('User already exists', 400);
        }
        let hashedPassword = await bcrypt.hash(password!, 10);
        const user: User[] = await prisma.$queryRaw`
            INSERT INTO "User" (name, email, password, "updatedAt")
            VALUES (${name}, ${email}, ${hashedPassword}, NOW())
            RETURNING *
        `;
        return user[0];
    }

    async findByEmail(email: string) {
        const user = await prisma.$queryRaw`
            SELECT * FROM "User" WHERE email = ${email}
        `;
        return user as User[];
    }

    async findAll(page: string = '1', limit: string = '10') {
        const users = await prisma.$queryRaw`
            SELECT * FROM "User"
            LIMIT ${+limit} OFFSET ${(+page - 1) * +limit}
        `;
        return users as User[];
    }

    async findById(id: number) {
        const user: User[] = await prisma.$queryRaw`
            SELECT * FROM "User" WHERE id = ${id}
        `;
        if (user.length === 0) {
            throw new AppError('User not found', 404);
        }
        return user[0]
    }

    async update({ id, name, email }: Partial<User>) {
        await this.findById(id!);
        let userExists = await this.findByEmailAndId(email!, id!);
        if (userExists.length > 0) {
            throw new AppError('User already exists', 400);
        }

        const user = await prisma.$queryRaw`
            UPDATE "User"
            SET name = ${name}, email = ${email}
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