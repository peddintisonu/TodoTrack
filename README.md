<div align="center">
  <img src="frontend/public/logo.svg" alt="TodoTrack Logo" width="100" />
  <h1>TodoTrack</h1>
  <p>Clarity Through Simplicity. Master Your Tasks.</p>

  <p>
    <img alt="Build" src="https://img.shields.io/badge/Build-Passing-f97316">
    <img alt="Status" src="https://img.shields.io/badge/Status-Active-f97316">
    <img alt="Deployment" src="https://img.shields.io/badge/Deployment-Ready-f97316">
  </p>
</div>

---

## 🚀 Live Demo

**[todotrack-buildwithsonu.vercel.app](https://todotrack-buildwithsonu.vercel.app/)**

## ✨ Features

A full-stack MERN application designed for clean, fast, and focused task management.

- ✅ **User Authentication**: Secure signup and login with JWT and cookies.
- ✅ **Todo Management**: Full CRUD (Create, Read, Update, Delete) functionality for tasks.
- ✅ **Status & Priority**: Organize tasks with clear statuses (`Not Started`, `In Progress`, `Completed`) and priorities (`High`, `Medium`, `Low`).
- ✅ **Interactive Dashboard**: View key statistics and manage all your todos in one place.
- ✅ **Dynamic Filtering**: Instantly filter tasks by both status and priority.
- ✅ **Profile Management**: Users can change their password and delete their account.
- ✅ **Light & Dark Mode**: A sleek, theme-aware interface for user comfort.
- ✅ **Fully Responsive**: A seamless experience on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

| Category      | Technologies & Libraries                                 |
| ------------- | -------------------------------------------------------- |
| **Frontend**  | React.js, Vite, Tailwind CSS, React Router, Lucide Icons |
| **Backend**   | Node.js, Express.js, MongoDB, Mongoose, JWT              |
| **Dev Tools** | ESLint, Prettier, Nodemon, Concurrently                  |

## ⚙️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### 2. Clone the Repository

```sh
git clone https://github.com/peddintisonu/TodoTrack.git
cd todotrack
```

### 3. Install Dependencies

This single command will install dependencies for the root, backend, and frontend workspaces.

```sh
npm run install:all
```

### 4. Set Up Environment Variables

You need to create environment files for both the backend and the frontend.

**For the Backend:**

1.  Navigate to the `backend` directory.
2.  Create a new file named `.env.development`.
3.  Copy the contents from `.env.example` and fill in your own values.

```env
# backend/.env.development
PORT=8000
NODE_ENV=DEVELOPMENT
JWT_SECRET=your_super_secret_key_here
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=TodoTrackDB
CLIENT_URL=http://localhost:5173
```

**For the Frontend:**

1.  Navigate to the `frontend` directory.
2.  Create a new file named `.env.development`.
3.  Copy the contents from `.env.example` and set the API URL.

```env
# frontend/.env.development
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=TodoTrack
```

### 5. Run the Application

Navigate back to the **root directory** of the project and run the following command to start both the frontend and backend development servers concurrently:

```sh
npm run dev
```

- The frontend will be available at `http://localhost:5173`.
- The backend API will be available at `http://localhost:8000`.

## 🚀 Deployment

This application is configured for separate deployments.

- **Frontend**: Deploy to static hosting services like Vercel or Netlify. Remember to set the `VITE_API_BASE_URL` environment variable to your deployed backend's URL.
- **Backend**: Deploy to services like Render or Heroku. Remember to set the `CLIENT_URL` environment variable to your deployed frontend's URL to enable CORS.
