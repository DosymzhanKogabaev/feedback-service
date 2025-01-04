# Feedback Service API

Feedback Service API — это серверная часть приложения для управления предложениями (фидбеками), предоставляющая пользователям возможность создавать предложения, голосовать за них и фильтровать по категориям и статусам.

## Стек технологий

- **Node.js** с **TypeScript**
- **Express.js** для маршрутизации
- **Prisma ORM** для работы с базой данных
- **PostgreSQL** как база данных
- **Swagger** для API-документации
- **JWT** для аутентификации

---

## Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/DosymzhanKogabaev/feedback-service.git
cd feedback-service
```

### 2. Установите зависимости

```bash
npm install
```

### 3. Настройте переменные окружения

Создайте файл `.env` в корне проекта и добавьте следующие переменные:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
JWT_SECRET="<your_jwt_secret>"
PORT=5000
```

### 4. Настройте базу данных

1. Синхронизируйте Prisma-схему с базой данных:

   ```bash
   npx prisma migrate dev --name init
   ```

2. Заполните таблицы `Category` и `Status` данными:

   ```bash
   npx ts-node src/prisma/seed.ts
   ```

3. Откройте Prisma Studio для просмотра данных:

   ```bash
   npx prisma studio
   ```

### 5. Запустите сервер

```bash
npm run dev
```

Сервер будет запущен на [http://localhost:5000](http://localhost:5000).

---

## Эндпоинты

### Аутентификация

| Метод | URL          | Описание                  |
|-------|--------------|---------------------------|
| POST  | `/auth/register` | Регистрация нового пользователя |
| POST  | `/auth/login`    | Авторизация пользователя      |
| GET   | `/auth/me`       | Получение данных текущего пользователя |

### Предложения (Feedback)

| Метод | URL            | Описание                             |
|-------|----------------|--------------------------------------|
| GET   | `/feedback`    | Получение всех предложений           |
| POST  | `/feedback`    | Создание нового предложения          |
| GET   | `/feedback/{id}` | Получение предложения по ID          |
| PUT   | `/feedback/{id}` | Обновление предложения               |
| DELETE| `/feedback/{id}` | Удаление предложения                 |

### Голосование (Upvotes)

| Метод | URL              | Описание                             |
|-------|------------------|--------------------------------------|
| POST  | `/upvotes/{id}`  | Добавление голоса за предложение     |
| DELETE| `/upvotes/{id}`  | Удаление голоса                      |

### Категории и Статусы

| Метод | URL             | Описание                  |
|-------|-----------------|---------------------------|
| GET   | `/categories`   | Получение списка категорий |
| GET   | `/statuses`     | Получение списка статусов |

---

## Swagger-документация

API-документация доступна по адресу:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Примеры запросов

### Регистрация пользователя

**URL:** `POST /auth/register`

**Пример тела запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "avatar": "https://example.com/avatar.png"
}
```

**Пример ответа:**
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

## Разработка

### Скрипты

- `npm run dev` — Запуск сервера в режиме разработки
- `npm run build` — Сборка проекта в папку `dist`
- `npm start` — Запуск собранного проекта
