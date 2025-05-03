# Real-Time Dashboard

A full-stack application featuring a responsive dashboard that displays data through multiple communication methods: WebSocket and REST API with polling.

## Features

- Real-time data display using WebSocket
- Historical data retrieval using REST API (polling every 30 seconds)
- Toggle between WebSocket and Polling modes
- Responsive design for both desktop and mobile
- Dockerized for local development and deployment

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js (Express.js) + WebSocket
- **Deployment**: Docker, Docker Compose, Vercel (frontend), Render (backend)

---

## 🔗 Live Demo

- **Frontend (Vercel)**: [https://real-time-dashboard-git-102c6c-syed-ahmedullah-jasers-projects.vercel.app/](https://real-time-dashboard-git-102c6c-syed-ahmedullah-jasers-projects.vercel.app/)

> ⚙️ The frontend is deployed on **Vercel**, and it fetches data from the backend service hosted on **Render** (not publicly linked here). Make sure to configure environment variables in Vercel accordingly. Note: Simply reload the page if it shows "no data available" in the historical data.


---
- **Backend (Render)**: [https://real-time-dashboard-884u.onrender.com/api/data/historical](https://real-time-dashboard-884u.onrender.com/api/data/historical)

> ⚙️ The backend is deployed on **Render**

---

## 🧑‍💻 Local Development (via Docker Compose)

### ✅ Prerequisites

- [Docker](https://www.docker.com/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

### 🚀 Run Locally

```bash
# Clone the repository
git clone https://github.com/syedahmedullah14/real-time-dashboard.git
cd real-time-dashboard

# Start the frontend and backend services
docker-compose up --build
