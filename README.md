# RK AgriCoaching App 🌾

A modern, responsive web application designed for aspirants preparing for the GPSSB Gram Sevak / VSO competitive exams.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide-React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with automatic JSON in-memory fallback if MongoDB isn't running)
- **Deployment:** GitHub Pages (Frontend)

---

## Features Included
1. **Beautiful Modern UI:** Green theme with gradients, micro-animations, and fully responsive cards.
2. **Topic-wise Notes:** Rendered dynamically with "Key Points".
3. **MCQ Quiz System:** Timed questions, interactive option selection, validation, score calculation, and result tracking.
4. **Previous Year Papers:** Interactive list with Mock PDF download buttons.
5. **Job Updates:** Color-coded active/closed GPSSB job updates.
6. **Authentication:** Simple Login/Signup workflow (localStorage state + basic node routes).

---

## How to Run Locally (Step-by-Step Instructions)

There are two parts to this project: the **Backend Server (Node)** and the **Frontend Client (React)**. You need to run both simultaneously if developing locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Start the Backend Server (Node.js)

1. Open your terminal and navigate to the project's root folder:
   ```bash
   cd "gram-sevak-prep"
   ```

2. Enter the `server` directory:
   ```bash
   cd server
   ```

3. Install the backend dependencies:
   ```bash
   npm install
   ```

4. Start the server (runs on Port 5001):
   ```bash
   npm run dev
   ```
   
> **Note on MongoDB:** The backend tries to connect to MongoDB. If you don't have MongoDB installed, **don't worry!** The server will gracefully fall back to using local JSON data and in-memory arrays for authentication. The app will work perfectly fine.

### Step 2: Start the Frontend Client (React.js)

1. Open a **New/Second Terminal** (keep the first one running the server!).
2. Navigate to the project's root folder:
   ```bash
   cd "gram-sevak-prep"
   ```

3. Enter the `client` directory:
   ```bash
   cd client
   ```

4. Install the frontend dependencies:
   ```bash
   npm install
   ```

5. Start the React development web server:
   ```bash
   npm start
   ```

6. The website will automatically open in your browser at `http://localhost:3000`.

---

## Folder Structure

```text
gram-sevak-prep/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer
│   │   ├── pages/          # Home, Notes, Quiz, PYQs, Jobs, Login
│   │   ├── services/       # axios API service
│   │   ├── App.js          # Main Router
│   │   └── index.css       # Tailwind entry and custom classes
│   ├── public/             # HTML template
│   ├── package.json        
│   └── tailwind.config.js  # Custom theme & colors
│
├── server/                 # Node/Express Backend
│   ├── routes/             # Authentication, Notes, Quiz, Jobs etc. API endpoints
│   ├── .env                # Port 5001 and MongoDB URI
│   ├── index.js            # Main express server
│   └── package.json
│
└── data/                   # Original JSON data files
```

*(For a detailed roadmap on the application architecture and how to build a Backend Admin Dashboard, please refer to the `ADMIN_README.md` file!)*
