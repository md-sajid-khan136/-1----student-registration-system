# Student Registration System: Backend

Express + Mongoose REST API for the student registration frontend.

## Run locally

```bash
npm install
cp .env.example .env     # then edit MONGODB_URI if needed
npm run dev
```

The API runs on http://localhost:5000. Check http://localhost:5000/api/health.

## Endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/students` | List all students (newest first) |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Register a student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

Errors return `{ "message": "..." }` with status 400 (invalid data), 404 (not found)
or 409 (duplicate roll number or email).

## Environment variables

| Name | Meaning |
| --- | --- |
| `PORT` | Port to listen on (hosts set this for you) |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_URL` | Frontend address allowed by CORS, e.g. `https://my-app.onrender.com` |

## Free hosting (trial)

1. **Database:** create a free M0 cluster on MongoDB Atlas, add a database user, allow
   network access from `0.0.0.0/0`, and copy the connection string.
2. **Push to GitHub:** keep `frontend/` and `backend/` folders in one repo. Never commit `.env`.
3. **API:** on Render, New > Web Service, pick the repo, set Root Directory to `backend`,
   Build Command `npm install`, Start Command `npm start`, instance type Free.
   Add env vars `MONGODB_URI` and `CLIENT_URL`.
4. **Frontend:** on Render, New > Static Site, Root Directory `frontend`, Build Command
   `npm install && npm run build`, Publish Directory `dist`. Set `VITE_API_URL` to
   `https://<your-api>.onrender.com/api`, and add a rewrite rule `/*` to `/index.html`.
5. Put the frontend's URL into the API's `CLIENT_URL`, and redeploy the API.

The free API sleeps after 15 minutes without traffic and takes about a minute to wake.
