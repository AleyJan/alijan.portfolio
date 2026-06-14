# Portfolio (MERN)

A single-page animated portfolio with an admin dashboard to edit all content and
read contact-form messages.

- `frontend/` — React + Vite + Tailwind + Framer Motion
- `backend/`  — Express + MongoDB (Mongoose) + JWT auth

## Routes

| Route     | What it is                                              |
| --------- | ------------------------------------------------------- |
| `/`       | The public portfolio                                    |
| `/login`  | Admin login (no public registration)                    |
| `/admin`  | Admin dashboard — edit content + read messages (guarded) |

## Prerequisites

- Node 18+ and Yarn
- **MongoDB** — either:
  - Local: install MongoDB Community Server (runs on `mongodb://127.0.0.1:27017`), or
  - Cloud: a free MongoDB Atlas cluster — paste its connection string into `backend/.env` as `MONGODB_URI`.

## 1. Backend

```bash
cd backend
npm install           # already done
# backend/.env is pre-filled with local defaults — edit if needed
npm run seed          # creates the admin user + seeds content
npm run dev           # API on http://localhost:5000
```

`npm run seed` prints the admin login. Defaults (change in `backend/.env`):

```
email:    admin@portfolio.com
password: changeme123
```

## 2. Frontend

```bash
cd frontend
yarn dev              # http://localhost:5173
```

Vite proxies `/api` and `/uploads` to the backend, so no extra config is needed.

## How content flows

1. The portfolio renders instantly from `frontend/src/content.js` (a local fallback),
   then overrides it with the DB version from `GET /api/content` if the API is up.
   **The site never breaks if the backend is offline.**
2. In `/admin → Content`, edit text, lists, and images (drag-free upload), then **Save** →
   `PUT /api/content`. Refresh the site to see changes.
3. The public contact form posts to `POST /api/leads`; submissions appear in
   `/admin → Messages`.

## API summary

| Method | Path                | Auth  | Purpose                  |
| ------ | ------------------- | ----- | ------------------------ |
| POST   | `/api/auth/login`   | —     | Get a JWT                |
| GET    | `/api/auth/me`      | token | Validate session         |
| GET    | `/api/content`      | —     | Read portfolio content   |
| PUT    | `/api/content`      | token | Update portfolio content |
| POST   | `/api/leads`        | —     | Submit contact form      |
| GET    | `/api/leads`        | token | List messages            |
| PATCH  | `/api/leads/:id`    | token | Mark read/unread         |
| DELETE | `/api/leads/:id`    | token | Delete a message         |
| POST   | `/api/upload`       | token | Upload an image          |

## Security notes

- Change `JWT_SECRET` and the admin password in `backend/.env` before deploying.
- `backend/.env` is gitignored; never commit real secrets.
