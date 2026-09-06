# Animal Reach

A full-stack platform to protect street animals: report a sighting, request an
emergency rescue, adopt an animal that's ready for a home, donate, or volunteer.

## 🔴 Live Demo

- **Website:** https://animal-reach.vercel.app
- **Backend API:** https://animal-reach-backend.onrender.com

> Note: the backend is hosted on Render's free tier, so it may take 20–30 seconds
> to "wake up" on the first request after a period of inactivity. This is normal.

## Tech Stack

- **Frontend:** React 18, React Router, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose, JWT authentication, bcrypt, Multer + Cloudinary
- **Database:** MongoDB (Atlas)
- **Deployment:** Vercel (frontend) + Render (backend) + MongoDB Atlas (database)

## Project Structure

```
animal-reach/
├── backend/     Express + MongoDB REST API
└── frontend/    React + Vite + Tailwind UI
```

## Features

- **Auth** — register/login with JWT, hashed passwords (bcrypt).
- **Report a stray animal** — photo upload (Cloudinary), condition, location, urgency.
- **Adopt** — browse listings, filter by species, apply to adopt.
- **Rescue requests** — urgent-case flow, separate from routine reports.
- **Donate** — pledge flow with a donation record and stats aggregation endpoint.
- **Volunteer** — register with skills, availability, and city.
- A custom-designed landing page with animations: scroll reveals, count-up stats,
  hand-drawn SVG illustrations, and an editorial layout — not a generic template.

## Local Setup

### 1. Backend

```bash
cd backend
cp .env.example .env      # fill in MongoDB URI, JWT secret, Cloudinary keys
npm install --legacy-peer-deps
npm run dev                # runs on http://localhost:5000
```

You'll need:
- A free MongoDB Atlas cluster → copy its connection string into `MONGO_URI`.
- A free Cloudinary account → copy cloud name/API key/API secret for image uploads.

### 2. Frontend

```bash
cd frontend
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm install --legacy-peer-deps
npm run dev                # runs on http://localhost:5173
```

Open http://localhost:5173.

## Deployment

- **Database:** MongoDB Atlas, with Network Access set to allow connections from anywhere (`0.0.0.0/0`) so Render can reach it.
- **Backend:** deployed on [Render](https://render.com) — root directory `backend`, build command `npm install --legacy-peer-deps`, start command `npm start`.
- **Frontend:** deployed on [Vercel](https://vercel.com) — root directory `frontend`, framework preset Vite, with `VITE_API_URL` pointing to the Render backend URL + `/api`.

## Why This Is a Strong Placement Project

- Solves a real problem with a clear user journey (report → volunteer → rescue/adopt), not just CRUD for its own sake.
- Touches authentication, file upload, role-based access, and a multi-collection data model.
- Fully deployed and live, not just running locally — a real, shareable product.
- Custom UI design (palette, typography, original SVG illustrations, scroll animations) instead of a default template.

## Roadmap / Ideas for v2

- Real payment gateway integration (Razorpay/Stripe) for donations.
- Admin dashboard to triage reports and rescues.
- Automatic nearest-volunteer matching by geolocation.
- Email/SMS notifications when a new report or rescue request comes in.

---

Built with care, one report at a time. 🐾