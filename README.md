# Turf-X 🏟️  
A full-featured turf booking platform built with the MERN stack and TypeScript. Turf-X allows users to book sports turf slots, host games, join shared slots, chat with co-players, and make secure payments.

## 🔗 Live Demo
[Coming Soon] – Add your deployed URL here

---

## 📌 Features

- 🎯 **Slot Booking**: Book turf slots in real-time with lock-based synchronization to avoid double booking.
- 🤝 **Shared Slot Hosting**: Host a game and allow other users to join and split the cost.
- 💬 **Real-time Chat**: Chat room for users in a shared game using Socket.io.
- 💳 **Payments**: Secure payments via **Stripe** for booking slots.
- 🔐 **Authentication**: JWT-based authentication with token blacklisting via Redis.
- 🧭 **Clean Architecture**: Follows clean and modular architecture principles.
- 🧠 **Role Management**: Basic user and admin functionality.
- 📦 **Tech Stack**: TypeScript, React.js, Node.js, Express.js, MongoDB, Socket.io, Stripe, Redis.

---

## 🚀 Tech Stack

| Category               | Tech                                                  |
|------------------------|--------------------------------------------------------|
| **Frontend**           | React.js, TypeScript, Tailwind CSS, Redux Toolkit     |
| **Backend**            | Node.js, Express.js, MongoDB, Redis, Socket.io        |
| **Authentication**     | JWT, Redis (token blacklisting)                       |
| **Payments**           | Stripe                                                |
| **Architecture**       | Clean Architecture, MVC, RESTful APIs                 |
| **Dev Tools**          | Git, Postman, VS Code, Nginx                          |

---

## 📂 Project Structure

```bash
Turf-X/
├── client/                # Frontend (React)
│   └── ...
├── server/                # Backend (Node.js + Express)
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       ├── models/
│       └── utils/
└── README.md
