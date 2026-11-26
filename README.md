# Employee Leave Management System — Backend Prototype

Backend-only prototype for ITEC 116 using NestJS, TypeORM, MySQL, JWT, and Postman.

## Requirements
- Node.js LTS and npm
- MySQL or XAMPP with MySQL enabled
- Postman
- VS Code

## Setup
1. Create a MySQL database named `employee_leave_management` in phpMyAdmin or MySQL:
   `CREATE DATABASE employee_leave_management;`
2. Copy `.env.example` to `.env` and enter your local MySQL settings.
3. Install dependencies: `npm install`
4. Start development server: `npm run start:dev`
5. API base URL: `http://localhost:3000`

TypeORM `synchronize: true` is enabled for local development only so tables are created automatically. Do not use this setting in production.

## First request flow
1. `POST /auth/register` creates an account.
2. `POST /auth/login` returns a JWT token.
3. In Postman, set `Authorization` → `Bearer Token` to the token.
4. Create a leave type using `POST /leave-types`.
5. Create a leave request using `POST /leave-requests`.

## Routes
- Auth: `POST /auth/register`, `POST /auth/login`
- Employees: `POST /employees`, `GET /employees`, `GET /employees/:id`, `PATCH /employees/:id`, `DELETE /employees/:id`
- Leave types: `POST /leave-types`, `GET /leave-types`, `GET /leave-types/:id`, `PATCH /leave-types/:id`, `DELETE /leave-types/:id`
- Leave requests: `POST /leave-requests`, `GET /leave-requests`, `GET /leave-requests/:id`, `PATCH /leave-requests/:id`, `DELETE /leave-requests/:id`
- Approvals: `POST /approvals`, `GET /approvals`, `GET /approvals/:id`, `PATCH /approvals/:id`, `DELETE /approvals/:id`
- Notifications: `POST /notifications`, `GET /notifications`, `GET /notifications/:id`, `PATCH /notifications/:id`, `DELETE /notifications/:id`

The CRUD endpoints are protected by JWT. This is an academic starter prototype. Before a real deployment, add role-based authorization, stronger business rules, pagination, rate limiting, and production database migrations.
