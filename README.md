# orthoplex-development-challange

This is Orthoplex Development Challange

## Introduction

You have been tasked with creating a user management API using Node.js and SQL. The API should allow the following
operations:

- Create a new user: The API should accept user details such as name, email, and password, and store them in a SQL database.
- Get user details: The API should retrieve user details based on the provided user ID.
- Update user details: The API should update user details such as name and email based on the provided user ID.
- Delete a user: The API should delete a user based on the provided user ID.

## How to run

- Clone the repo
- Run `npm install`
- Add `.env` file with the variables mentioned in `.env.samples`
- To migrate the database run `npx prisma db push`
- Run `npm run dev` to start the server in development mode
- Run `npm run build` to build the project
- Run `npm start` to start the server in production mode

## Database Schema

- Database schema is available at `prisma/schema.prisma` file

## Postman Collection

- Postman collection is available at `public/docs` directory
