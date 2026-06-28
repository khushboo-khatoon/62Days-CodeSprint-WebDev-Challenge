# 🚀 Velnixa Server

### A Scalable Node.js & Express Backend powering the Velnixa E-Commerce Platform

The **Velnixa Server** is the backend service of the Velnixa E-Commerce Platform. It is built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**, following a layered architecture to ensure scalability, maintainability, and security.

---

# 📖 Overview

Velnixa Server provides secure REST APIs for the complete e-commerce workflow including authentication, product management, cart operations, wishlist handling, order management, and administrative features.

The backend follows a layered architecture that separates Controllers, Services, Repositories, and Database access, making the application easier to maintain and scale.

---

# ✨ Features

## 👤 Authentication

* JWT Authentication
* Refresh Token Rotation
* OTP Email Verification
* Forgot Password
* Password Reset
* Session Management
* Protected Routes

---

## 🛍 E-Commerce

* Product CRUD
* Category Management
* Shopping Cart APIs
* Wishlist APIs
* Order Management
* User Profile Management

---

## 👨‍💼 Admin

* Admin Dashboard APIs
* Role Based Authorization
* Product Management
* User Management

---

## 🔐 Security

* Password Hashing (bcrypt)
* JWT Authentication
* HTTP Only Cookies
* Role Based Access Control
* Protected API Routes
* Input Validation
* Environment-based Configuration

---

# 🛠 Technology Stack

## Runtime

* Node.js
* Express.js
* TypeScript

---

## Database

* MongoDB
* Mongoose

---

## Authentication

* JWT
* bcrypt

---

## Utilities

* Nodemailer
* Cookie Parser
* CORS
* Zod

---

# 🏗 Backend Architecture

```text
Client
   │
   ▼
Routes
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
src
│
├── config
├── controllers
├── docs
├── middlewares
├── models
├── repositories
├── routes
├── services
├── types
├── utils
└── app.ts
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
Input Validation
   │
   ▼
Password Verification
   │
   ▼
JWT Generation
   │
   ▼
HTTP Only Cookie
   │
   ▼
Protected APIs
```

---

# 🗄 Database Design

The backend uses **MongoDB** with **Mongoose ODM**.

Main collections include:

* Users
* Products
* Categories
* Carts
* Wishlists
* Orders
* OTP Records
* Sessions

---

# 📚 Documentation

Complete project documentation is available inside the `docs/` directory.

* 📘 API Documentation
* 🏗 Architecture Documentation
* 🗄 Database Documentation
* 🔐 Security Documentation
* ⚙ Setup Guide

---

# 🔌 API Overview

The backend exposes RESTful APIs for:

### Authentication

* User Registration
* User Login
* Logout
* OTP Verification
* Password Reset

### Products

* Create Product
* Update Product
* Delete Product
* Get Products
* Product Details

### Cart

* Add to Cart
* Remove from Cart
* Update Cart

### Wishlist

* Add Wishlist
* Remove Wishlist
* Get Wishlist

### Orders

* Create Order
* Order History
* Order Details

### Admin

* Dashboard APIs
* Product Management
* User Management

---

# 🛣 Future Improvements

The following features are planned for future releases:

* Razorpay / Stripe Integration
* Product Reviews & Ratings
* Product Search
* Image Upload Optimization
* Coupons & Discounts
* Address Management
* Sales Analytics
* Inventory Reports
* Redis Caching
* API Rate Limiting

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### ⭐ If you find this project useful, consider giving it a star.

Built with ❤️ using Node.js, Express.js, TypeScript & MongoDB

</div>
