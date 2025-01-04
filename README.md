# Feedback Service API

Feedback Service API is a server-side application for managing feedbacks, providing users with the ability to create suggestions, vote for them, and filter them by categories and statuses.

## Technology stack

- **Node.js** with **TypeScript**
- **Express.js** for routing
- **Prisma ORM** to work with the database
- **PostgreSQL** as a database
- **Swagger** for API documentation
- **JWT** for authentication

---

## Production server

The Production server is available at: [https://feedback-service-fnhf.onrender.com/api-docs](https://feedback-service-fnhf.onrender.com/api-docs)

---

## Installation and launch

In order to launch the server locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/DosymzhanKogabaev/feedback-service.git
cd feedback-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following variables:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
JWT_SECRET="<your_jwt_secret>"
PORT=5000
```

### 4. Set up the database

1. Synchronize the Prisma schema with the database:

   ```bash
   npx prisma migrate dev --name init
   ```

2. Fill the `Category` and `Status` tables with data:

   ```bash
   npx ts-node src/prisma/seed.ts
   ```

3. Open Prisma Studio to view the data:

   ```bash
   npx prisma studio
   ```

### 5. Start the server

```bash
npm run dev
```

The server will be running on [http://localhost:5000](http://localhost:5000).

---

## Endpoints

### Authentication

| Метод | URL          | Описание                  |
|-------|--------------|---------------------------|
| POST  | `/auth/register` | New User Registration |
| POST  | `/auth/login`    | User authorization      |
| GET   | `/auth/me`       | Getting current user data |

### Предложения (Feedback)

| Метод | URL            | Описание                             |
|-------|----------------|--------------------------------------|
| GET   | `/feedback`    | Receive all feedbacks           |
| POST  | `/feedback`    | Create a new feedback          |
| GET   | `/feedback/{id}` | Receive a feedback data by ID          |
| PUT   | `/feedback/{id}` | Update a feedback by ID               |
| DELETE| `/feedback/{id}` | Delete a feedback by ID                 |

### Upvotes

| Метод | URL              | Описание                             |
|-------|------------------|--------------------------------------|
| POST  | `/upvotes/{id}`  | Add an upvote for a feedback by its ID     |
| DELETE| `/upvotes/{id}`  | Delete an upvote by feedback's ID  |

### Категории и Статусы

| Метод | URL             | Описание                  |
|-------|-----------------|---------------------------|
| GET   | `/categories`   | Get the list of all categories |
| GET   | `/statuses`     | Get the list of all statuses |

---

## Swagger documentation

API documentation will be available at:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Examples of queries

### User registration

**URL:** `POST /auth/register`

**Request body example:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "avatar": "https://example.com/avatar.png"
}
```

**Result example:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "password": "$2b$10$fvIo7n7JydBin0zznIz18.MovJZAX7wdKUTZsPu2Vx4yb8hByan3C",
    "avatar": "https://example.com/avatar.png",
    "createdAt": "2025-01-04T12:34:56.789Z"
  }
}
```

---

## Development

### Scripts

- `npm run dev` — Запуск сервера в режиме разработки
- `npm run build` — Сборка проекта в папку `dist`
- `npm start` — Запуск собранного проекта
