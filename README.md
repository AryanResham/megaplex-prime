# Megaplex Prime – Real Estate Website

A full-stack real estate website for **Megaplex Prime** with a public-facing landing page and an admin panel to manage all website content.

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend  | Node.js, Express                           |
| Database | SQLite (via better-sqlite3)                |
| Auth     | Express Sessions (cookie-based)            |

## Project Structure

```
assignment2/
├── backend/
│   ├── server.js        # Express server with auth & content API routes
│   ├── db.js            # SQLite database setup & seed data
│   └── database.sqlite  # SQLite database file (auto-created)
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── HomePage.jsx         # Public landing page
│       │   ├── AdminLogin.jsx       # Admin login page
│       │   └── AdminDashboard.jsx   # Admin content editor
│       ├── components/              # UI sections (Navbar, Hero, FAQ, Footer, etc.)
│       ├── App.jsx                  # Routes
│       └── main.jsx                 # Entry point
│
└── .gitignore
```

## How to Run

### 1. Backend

```bash
cd backend
npm install
npm start
```

Server starts on **http://localhost:5000**.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App opens on **http://localhost:5173**.

## Admin Panel

- Go to `/admin` to access the login page.
- **Email:** `admin@gmail.com`
- **Password:** `1234`
- Once logged in, you can edit all website sections (Hero, About, Floor Plans, Amenities, FAQ, Footer, etc.) from the dashboard.

## API Endpoints

| Method | Endpoint            | Description             | Auth     |
| ------ | ------------------- | ----------------------- | -------- |
| GET    | `/api/content`      | Get all section content | No       |
| GET    | `/api/content/:key` | Get a single section    | No       |
| PUT    | `/api/content/:key` | Update a section        | Required |
| POST   | `/api/auth/login`   | Admin login             | No       |
| POST   | `/api/auth/logout`  | Admin logout            | No       |
| GET    | `/api/auth/check`   | Check auth status       | No       |

## Error Handling

If the backend server is not running, the frontend shows a loading spinner for **10 seconds** and then displays a **"Please try again later"** message instead of showing a broken page.
