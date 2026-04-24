# Architecture & Admin Panel Blueprint

This document explains exactly how the Frontend and Backend communicate in the **RK AgriCoaching** app and outlines the steps required to build a fully functional Admin Panel for future scaling.

---

## 🏛️ How the Frontend Works with the Backend

In a modern web application, the frontend (what you see) and backend (where data lives) are separated but communicate constantly.

### 1. The Overview
- **The Frontend (React App in `/client`)**: It handles all User Interface, animations, CSS routing, and button clicks. It doesn't store the massive database of questions natively; it "asks" for it.
- **The Backend (Express / Node in `/server`)**: Think of it as a waiter. It listens for requests from the frontend, securely fetches data from MongoDB (or JSON files), and hands it back to the frontend.

### 2. The Data Flow (Example: Loading a Quiz)
1. A user clicks "Practice Quiz" on the website.
2. React triggers a function inside `client/src/services/api.js`.
3. `axios` sends an HTTP `GET` request to `http://localhost:5001/api/quiz`.
4. Our Node.js Express server receives that request.
5. Node retrieves the quiz data from a MongoDB Database (or from local files if MongoDB is down).
6. Node responds by sending structured JSON data back to React.
7. React maps over that JSON data to magically render the question layout!

*(Note: On our live GitHub pages deployment, the backend is skipped, and React directly reads the absolute local JSON backups so it always stays online!).*

---

## 🛠️ How to Add an Admin Panel to Change Content

Currently, Notes, PYQs, Quizzes, and Jobs are stored locally in the `/data/*.json` files. If you want to log in as an administrator to upload or edit these records from a website UI without touching code, you need to build an **Admin Dashboard**.

Here is the exact step-by-step roadmap to developing it:

### Phase 1: Database & Backend Rules
1. **Connect MongoDB Permanently**: Ensure a MongoDB database is permanently hosted on the cloud (e.g., MongoDB Atlas). You can't write data to static files on cloud hosting permanently.
2. **Create Database Models**: In `server/routes/...`, set up the schema and schema-types for Notes, Quizzes, and Jobs using the Mongoose library.
3. **Build Private APIs**: Create `POST`, `PUT`, and `DELETE` routes in the backend logic.
   - Example: `POST /api/jobs` will accept form-data to broadcast new job alerts.
4. **JWT Authentication**: Create an Admin Token. When creating routes, add a middleware validating the JWT to ensure ONLY users with the role `"admin"` can trigger those `POST`/`PUT` routes.

### Phase 2: React Admin Dashboard
1. **Admin Routes**: In `App.js`, create a protected path like `<Route path="/admin/dashboard" />`.
2. **Admin Gateway**: Wrap this route in an authentication component that checks if the logged-in user context matches `role: 'admin'`. If not, redirect them to the home page or login screen.
3. **Build the Forms**: 
   - Create a page inside React called `CreateQuiz.js` or `ManageNotes.js`.
   - Add a form with fields: *Question, Option A, Option B, Option C, Option D, Answer, Explanation*.
   - Add a submit button, **"Upload Question"**.
4. **Connecting the Form**: When you click "Upload", use Axios to send a `POST` request populated with the form data to your newly created private backend route, attaching your Admin JWT in the headers.
5. **Instant Updates**: Because data fetching relies entirely on the Database, as soon as you upload a mock test via your Admin Panel form, regular users navigating to the Quizzes page will immediately see the new Mock Test available to solve!
