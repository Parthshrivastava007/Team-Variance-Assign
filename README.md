# Full-Stack Notes Application

This project is a clean, modern, and highly responsive Full-Stack Notes Application consisting of:
1. A **Node.js + Express** REST API backend (`/server`).
2. A **React (Vite) + Tailwind CSS v4** frontend (`/client`).

---

## Folder Structure

For submission compliance, the project uses the following layout:
* `/server` - Backend Express API.
* `/client` - Frontend React application.

---

## Getting Started

Follow these steps to run the application locally. Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Run the Backend (Server)

1. Open your terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *The server will run on [http://localhost:5000](http://localhost:5000).*

### 2. Run the Frontend (Client)

1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will run on [http://localhost:5173](http://localhost:5173).*

---

## Assumptions & Design Decisions

### 1. Storage & Mock Data
* As permitted by the guidelines, notes are stored in-memory in a clean JavaScript array on the server.
* Pre-loaded seed notes are loaded on server initialization so the application has visual content immediately on startup.

### 2. CORS Integration
* CORS (`cors` package) is enabled on the server to allow the React app (running on port `5173`) to call the API endpoints (running on port `5000`) without origin blocking.

### 3. Styling & UX Design
* We used **Tailwind CSS v4** combined with the modern Vite template.
* Custom theme settings and standard Outfit typography were introduced to offer a sleek, dark-themed, glassmorphic layout.
* Visual skeletons are shown when loading notes to elevate perceived performance.

### 4. Custom Toast Notifications
* A customized, state-managed Toast component was built from scratch in React to report notes being created, updated, or deleted. 
* This avoids bloating the package tree with external libraries and guarantees smooth performance inside React 19.

### 5. Input Validation
* The server verifies that note creation (`POST`) or updates (`PUT`) include non-empty titles and content.
* If user inputs fail basic validation, a `400 Bad Request` code with a descriptive JSON error is returned.
* Clean `try...catch` handlers are present on all backend endpoints to prevent crashes and return `500 Internal Server Error` statuses if unhandled errors occur.
