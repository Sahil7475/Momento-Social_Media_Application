# Momento - Social Media Application

Momento is a full-stack social media web application built using the MERN stack, WebSockets, and other modern libraries. It supports user authentication, real-time messaging, meme display, and various social features.

## 🌟 Features

- 🔐 JWT token-based authentication
- 👥 Add friends, search users, and view profiles
- 📸 Create posts with images (Multer for storage)
- 🎉 Meme display
- 💬 Real-time chat with friends (Socket.io)
- 🔔 Notifications for new messages

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Formik, Material UI
- **Backend:** Node.js, Express, MongoDB
- **WebSockets:** Socket.io
- **Authentication:** JSON Web Token (JWT)
- **State Persistence:** Redux-Persist (local storage)
- **File Uploads:** Multer

## 🗂 Folder Structure

```bash
/Momento-Social_Media_Application
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── scenes/       # Pages like home, login, profile
│   │   ├── state/       # Redux slices
│   
└── server/              # Node.js backend
    ├── controllers/    # Route handlers
    ├── middleware/     # Authentication, error handling
    ├── models/         # Mongoose schemas
    └── routes/         # API routes
    └── public/assets   # File Upload Folder
    └── data/           # dummy data
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.14.0)
- npm (v10.7.0)
- MongoDB

### 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sahil7475/Momento-Social_Media_Application.git
   cd Momento-Social_Media_Application
   ```

2. **Install dependencies:**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `server/` folder with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the app:**
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend client
   cd ../client
   npm start
   ```

5. **Access the app:**
   Open `http://localhost:3000` in your browser.

## 📡 API Endpoints

- **Auth routes:**     `/auth/register`, `/auth/login`
- **User routes:**     `/users/:id`,`/users/`,`/users/:id/friends`,`/users/:id/friendId`
- **Post routes:**     `/posts`, `/posts/:userid/posts`,`/posts/:id/like`,`/posts/:id/comment`
- **Chat routes:**     `/chat`
- **Message routes:**  `/message`,`/message/:chatId`

## 🌍 Live Demo

The application is hosted on **Vercel**: [Momento Live](https://momento-eosin.vercel.app/)


