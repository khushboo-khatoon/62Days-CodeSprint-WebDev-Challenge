<div align="center">

# 🛒 Velnixa - Modern MERN E-Commerce Platform

### A Full-Stack E-Commerce Web Application built with the MERN Stack featuring Authentication, Product Management, Shopping Cart, Wishlist, Admin Dashboard, and secure REST APIs.

</div>

<p></p>

---

# 📑 TABLE OF CONTENTS

- [📖 Overview](#-overview)
- [✨ Core Features](#-core-features)
- [🛠 Technology Stack](#-technology-stack)
- [🏗 System Architecture](#-system-architecture)
- [📂 Project Structure](#-project-structure)
- [🔐 Authentication Flow](#-authentication-flow)
- [⚙ Environment Variables](#-environment-variables)
- [🚀 Installation Guide](#-installation-guide)
- [▶ Running the Project](#-running-the-project)
- [📚 API Documentation](#-api-documentation)
- [🛣 Future Roadmap](#-future-roadmap)
- [👨‍💻 Author](#-author)
- [📄 License](#-license)

---

# 📖 Overview

Velnixa is a modern full-stack e-commerce platform developed using the **MERN Stack**.

The project focuses on clean architecture, scalability, secure authentication, and responsive user experience. It implements industry-standard backend architecture with Controllers, Services, Repositories, and modular frontend components.

This project is designed for learning modern full-stack development while following production-oriented practices.

---

# ✨ Core Features

## 👤 Authentication

- JWT Authentication
- Secure Login & Signup
- OTP Email Verification
- Forgot Password
- Password Reset
- Refresh Token Rotation
- Session Management

---

## 🛍 Shopping Features

- Product Listing
- Product Details
- Category Filtering
- Shopping Cart
- Wishlist
- Responsive Design

---

## 👨‍💼 Admin Features

- Admin Dashboard
- Product CRUD
- User Management
- Order Management
- Role Based Access Control

---

## 🔐 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- HTTP Only Cookies
- Protected Routes
- Role Based Authorization

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zustand
- Lucide React

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Nodemailer
- Cookie Parser
- CORS
- Zod

---

# 🏗 System Architecture

```text
Client (React)
      │
      ▼
React Router
      │
      ▼
Axios
      │
      ▼
Express Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
MongoDB
```

---

# 📂 Project Structure

```text
Velnixa
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── api
│   ├── store
│   ├── assets
│   └── utils
│
├── server
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── models
│   ├── routes
│   ├── middlewares
│   ├── config
│   ├── utils
│   ├── docs
│   └── types
│
├── README.md
└── LICENSE
```

---

# 🔐 Authentication Flow

```text
User
   │
   ▼
Login / Signup
   │
   ▼
Validation
   │
   ▼
JWT Token Generation
   │
   ▼
HTTP Only Cookie
   │
   ▼
Protected Routes
```

---

# ⚙ Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=

MONGO_URI=

JWT_SECRET=

USER_EMAIL=

GMAIL_APP_PASSWORD=
```

---

# 🚀 Installation Guide

## Clone Repository

```bash
git clone https://github.com/abhisek2004/62Days-CodeSprint-WebDev-Challenge/Project/MERN/velnixa.git

cd Velnixa
```

---

## Install Frontend

```bash
cd client

npm install
```

---

## Install Backend

```bash
cd server

npm install
```

---

# ▶ Running the Project

## Start Backend

```bash
cd server

npm run dev
```

---

## Start Frontend

```bash
cd client

npm run dev
```

---

# 📚 API Documentation

Detailed backend documentation is available in:

```text
server/docs
│
├── api.md
├── architecture.md
├── database.md
├── security.md
└── setup.md
```

---

# 🛣 Future Roadmap

The following features are planned for future releases:

- 🔍 Product Search
- ⭐ Product Reviews & Ratings
- 📦 Address Management
- 💳 Razorpay / Stripe Integration
- 🖼 Product Image Upload
- 🎟 Coupon System
- 📊 Sales Analytics
- 📄 Invoice Generation
- ❤️ Recently Viewed Products
- 📱 Progressive Web App (PWA)

---

# 👨‍💻 Author

**Om Narayan Kumar**

Full Stack Developer

GitHub: https://github.com/om-dev007

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star.

Built with ❤️ using the MERN Stack

</div>