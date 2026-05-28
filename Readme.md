# DSA Tracker Web App

A full-stack MERN application for tracking DSA practice, solved problems, revision questions, streaks, and progress analytics.

## Features

- JWT-based signup, login, logout, and protected routes
- Add, view, filter, search, and delete DSA problems
- Track problem title, platform, difficulty, status, tags, notes, URL, and solved date
- Mark important questions for revision
- Dashboard with solved count, current streak, longest streak, and recent problems
- Analytics with difficulty split, topic-wise progress, charts, and activity heatmap
- Night mode with persisted theme preference
- Responsive sidebar layout

## Tech Stack

**Frontend**

- React
- Vite
- Tailwind CSS
- React Router
- Chart.js / react-chartjs-2
- Lucide React icons

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- Helmet, CORS, Morgan

## Project Structure

```txt
dsa-tracker/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

Install all dependencies:

```bash
npm.cmd run install:all
```

Or install separately:

```bash
npm.cmd install --prefix server
npm.cmd install --prefix client
```

### Environment Variables

Create `server/.env` from `server/.env.example`:

```env
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/dsa-tracker
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

### Run The App

Start backend and frontend together:

```bash
npm.cmd run dev
```

Or run them separately:

```bash
npm.cmd run server
npm.cmd run client
```

Open the app:

```txt
http://localhost:5173
```

Backend health check:

```txt
http://localhost:5050/api/health
```

The frontend uses a Vite proxy, so client requests to `/api` are forwarded to `http://localhost:5050`.

## API Routes

### Auth

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| POST | `/api/auth/logout` | Logout current user |
| GET | `/api/auth/me` | Get logged-in user |

### Problems

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/problems` | Add a problem |
| GET | `/api/problems` | Get user problems with filters |
| GET | `/api/problems/:id` | Get one problem |
| PUT | `/api/problems/:id` | Update a problem |
| DELETE | `/api/problems/:id` | Delete a problem |

### Stats

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/stats` | Dashboard and analytics stats |
| GET | `/api/streak` | Current and longest streak |

## Problem Schema

Each problem contains:

- `title`
- `platform`
- `difficulty`
- `status`
- `tags`
- `notes`
- `problemUrl`
- `isImportant`
- `solvedAt`

## Screenshots

Add screenshots here after pushing the project:

```md
![Dashboard](screenshots/dashboard.png)
![Problems](screenshots/problems.png)
![Analytics](screenshots/analytics.png)
```

## Future Improvements

- AI-based problem suggestions from weak topics
- AI-generated revision plans
- Daily reminder notifications
- CSV export
- Calendar heatmap with yearly view
- Edit problem modal
- Deployment with Render/Railway, Vercel, and MongoDB Atlas

## AI Feature Ideas

You can add AI by creating a protected backend route such as `/api/ai/suggestions`.

Possible AI prompts:

- Suggest next problems based on weak tags
- Generate a 7-day revision plan
- Summarize notes for important questions
- Recommend topics to focus on from solved history

Keep AI API keys only on the backend in `.env`, never in the React app.

## License

This project is open for learning, portfolio use, and further customization.
