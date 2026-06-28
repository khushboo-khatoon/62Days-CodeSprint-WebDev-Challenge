# Architecture Documentation

# Project Architecture

```txt
Client
 ↓
Routes
 ↓
Controllers
 ↓
Services
 ↓
Repositories
 ↓
MongoDB
```

---

# Folder Responsibilities

## Routes

Define API endpoints.

## Controllers

Handle request and response.

## Services

Business logic layer.

## Repositories

Database interaction layer.

## Models

Database schemas.

---

# Request Lifecycle

```txt
Request
 ↓
Route
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```