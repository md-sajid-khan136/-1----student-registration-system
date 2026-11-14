# Student Registration System: Frontend

React (Vite) frontend for the MERN student registration system.

## Run it

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173. In development, requests to `/api` are proxied to
`http://localhost:5000` (see `vite.config.js`), so start your Express server on port 5000.

## Features

- Register a student with validation and a live ID card preview
- List students with search and a department filter
- Edit and delete (with an inline confirm step)

## Backend contract

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/students` | List all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

Student fields: `fullName`, `rollNumber`, `email`, `phone`, `dateOfBirth`, `gender`,
`department`, `semester` (number), `address`. MongoDB supplies `_id`.

On errors, return JSON like `{ "message": "Roll number already exists" }` and the
form will show it.

## Deploying

Set `VITE_API_URL` to your deployed backend URL (ending in `/api`) and run `npm run build`.
Enable CORS on the Express server for your frontend origin.
