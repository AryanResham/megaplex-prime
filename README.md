# Megaplex Prime – Real Estate Website with Admin CMS

A full-stack, content-managed real estate website for **Megaplex Prime (Ugam Amarta Infinity)**. Features a polished public-facing landing page and a powerful admin dashboard with **live preview** and **field-level highlighting** for real-time content editing.

---

## Tech Stack

| Layer      | Technology                                      |
| ---------- | ----------------------------------------------- |
| Frontend   | React 19, Vite 7, Tailwind CSS v4, React Router |
| Backend    | Node.js, Express 4                              |
| Database   | SQLite (via better-sqlite3, WAL mode)           |
| Auth       | Express Sessions (cookie-based)                 |
| Deployment | Render-ready (trust proxy, secure cookies)      |

---

## Features

### Public Website (`/`)

- Responsive landing page with **9 content sections**: Hero, About Project, Floor Plans, Amenities, Explore Buildings, About Developer, Construction Updates, FAQ, and Footer
- All content is **dynamically loaded** from the database via REST API
- Smooth scroll navigation, hover animations, and modern design
- Graceful error handling — shows a loading spinner for 10 seconds, then a "Please try again later" message if the server is unreachable

### Admin Dashboard (`/admin/dashboard`)

- **Session-based authentication** — login at `/admin` with email/password
- **Section-by-section editor** — sidebar navigation for all 9 website sections
- **Live Preview Panel** — real-time preview of the section you're editing, rendered using the exact same components as the live website (pixel-accurate)
- **Field Highlighting** — when you focus on an input field in the editor, the corresponding element in the preview panel glows with a green ring, so you can instantly see which content you're changing
- **Preview Toggle** — show/hide the preview panel via a button in the sidebar for more editing space
- **Auto-generated forms** — the editor dynamically generates input fields and textareas based on the section's data structure (supports strings, objects, and arrays)
- **Save with feedback** — save button with success/error messages

---

## Project Structure

```
assignment2/
├── backend/
│   ├── server.js           # Express server — auth routes, content CRUD API, session config
│   ├── db.js               # SQLite setup, schema creation, default seed data
│   ├── database.sqlite     # SQLite database file (auto-created on first run)
│   └── package.json
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── HomePage.jsx          # Public landing page — renders all sections
│       │   ├── AdminLogin.jsx        # Admin login form
│       │   └── AdminDashboard.jsx    # Admin CMS — editor + live preview + field highlighting
│       │
│       ├── components/               # Website section components
│       │   ├── Navbar.jsx            # Navigation bar
│       │   ├── HeroSection.jsx       # Hero banner with pricing cards
│       │   ├── AboutProject.jsx      # Project description
│       │   ├── FloorPlans.jsx        # Tabbed floor plan viewer
│       │   ├── VideoSection.jsx      # Embedded video
│       │   ├── Amenities.jsx         # Amenities grid with SVG icons
│       │   ├── ExploreBuildings.jsx  # Building cards with status badges
│       │   ├── AboutDeveloper.jsx    # Developer stats and description
│       │   ├── ConstructionUpdates.jsx # Construction photo grid
│       │   ├── FAQ.jsx               # Accordion FAQ
│       │   └── Footer.jsx            # Footer with contact info and links
│       │
│       ├── App.jsx                   # React Router setup (3 routes)
│       ├── main.jsx                  # Entry point
│       └── index.css                 # Global styles, fonts, Tailwind import
│
├── README.md
└── .gitignore
```

---

## How to Run

### Prerequisites

- **Node.js** v18+ installed

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

Backend runs on **http://localhost:5000**.  
The SQLite database (`database.sqlite`) is automatically created and seeded with default content on first run.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**.

### 3. Access the App

| Page            | URL                                   |
| --------------- | ------------------------------------- |
| Public Website  | http://localhost:5173/                |
| Admin Login     | http://localhost:5173/admin           |
| Admin Dashboard | http://localhost:5173/admin/dashboard |

---

## Admin Login Credentials

| Field    | Value                                          |
| -------- | ---------------------------------------------- |
| Email    | `test@test.com` (or set `ADMIN_EMAIL` env var) |
| Password | `1234` (or set `ADMIN_PASSWORD` env var)       |

---

## API Endpoints

| Method | Endpoint            | Description             | Auth Required |
| ------ | ------------------- | ----------------------- | ------------- |
| GET    | `/api/content`      | Get all section content | No            |
| GET    | `/api/content/:key` | Get a single section    | No            |
| PUT    | `/api/content/:key` | Update a section        | Yes           |
| POST   | `/api/auth/login`   | Admin login             | No            |
| POST   | `/api/auth/logout`  | Admin logout            | No            |
| GET    | `/api/auth/check`   | Check authentication    | No            |

### Content Section Keys

`hero` · `about_project` · `floor_plans` · `amenities` · `explore_buildings` · `about_developer` · `construction_updates` · `faq` · `footer`

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│                                                              │
│  HomePage ─── fetches /api/content ──► renders all sections  │
│                                                              │
│  AdminDashboard ────┬── Editor Panel (auto-generated forms)  │
│                     │                                        │
│                     └── Live Preview Panel                   │
│                         (same components as HomePage)        │
│                         + field highlighting on focus         │
└──────────────────────────┬──────────────────────────────────┘
                           │ REST API (fetch with credentials)
┌──────────────────────────┴──────────────────────────────────┐
│                     Backend (Express)                         │
│                                                              │
│  Session Auth ─── cookie-based, httpOnly                     │
│  Content API ─── CRUD on SQLite sections table               │
│  Database ─── better-sqlite3 with WAL mode                   │
└─────────────────────────────────────────────────────────────┘
```

### How the Admin Live Preview Works

1. The **AdminDashboard** imports all 9 section components (same ones used on the public site)
2. A `SECTION_COMPONENTS` map links each section key (`hero`, `faq`, etc.) to its React component
3. The editor forms are **auto-generated** from the section's JSON data structure
4. As the admin types, `content` state updates → the preview component re-renders instantly
5. When an input is focused, `focusedField` state is set → passed as `highlightField` prop to the preview component → the corresponding DOM element gets a green ring glow

---

## Environment Variables (Optional)

These can be set in a `.env` file in the `backend/` directory:

| Variable         | Default                          | Description                           |
| ---------------- | -------------------------------- | ------------------------------------- |
| `PORT`           | `5000`                           | Backend server port                   |
| `SESSION_SECRET` | `megaplex-prime-secret-key-2024` | Session encryption secret             |
| `ADMIN_EMAIL`    | `test@test.com`                  | Admin login email                     |
| `ADMIN_PASSWORD` | `1234`                           | Admin login password                  |
| `NODE_ENV`       | (unset)                          | Set to `production` for HTTPS cookies |
| `FRONTEND_URL`   | `http://localhost:5173`          | CORS allowed origin                   |

For the frontend, create a `.env` in `frontend/`:

| Variable       | Default                 | Description          |
| -------------- | ----------------------- | -------------------- |
| `VITE_API_URL` | `http://localhost:5000` | Backend API base URL |

---

## Error Handling

- **Frontend**: If the backend is unreachable, a loading spinner shows for 10 seconds, then a friendly "Server Unavailable — Please try again later" message is displayed
- **Backend**: All API routes return appropriate HTTP status codes (200, 401, 404, 500) with JSON error messages
- **Auth**: Unauthorized requests to protected routes receive a `401 Unauthorized` response

---

## Deployment Notes

The backend is configured for deployment on platforms like **Render**:

- `app.set('trust proxy', 1)` — trusts the reverse proxy for secure cookies
- Cookie settings are **environment-aware**: `secure: true` and `sameSite: 'none'` in production, `secure: false` and `sameSite: 'lax'` in development
- Set `NODE_ENV=production` and `FRONTEND_URL` to your deployed frontend URL
