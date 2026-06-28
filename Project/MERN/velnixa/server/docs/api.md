# API Documentation

Base URL

```txt
/api
```

---

# Authentication

Base Route

```txt
/api/auth
```

## Register

POST `/register`

Body:

```json
{
  "name":"John",
  "email":"john@example.com",
  "password":"123456"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "...",
      "email": "...",
      "otpId": "..."
    }
  }
}
```

---

## Login

POST `/login`

Body:

```json
{
  "email":"john@example.com",
  "password":"123456"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "user": {}
  }
}
```

Note:

- Refresh Token is stored in HTTP Only Cookie

---

## Verify OTP

POST `/verify-otp`

---

## Resend OTP

POST `/resend-otp`

---

## Forgot Password

POST `/forgot-password`

---

## Reset Password

POST `/reset-password`

---

## Rotate Token

POST `/rotate-token`

---

## Logout

POST `/logout`

---

## Logout All Devices

POST `/logout-all`

---

# User Routes

Base Route

```txt
/api/user
```

GET `/`

PATCH `/:id`

DELETE `/:id`

---

# Product Routes

Base Route

```txt
/api/products
```

GET `/data`

GET `/popular`

GET `/men`

GET `/women`

GET `/kids`

GET `/filter`

GET `/new-arrivals`

GET `/home`

GET `/:id`

---

# Cart Routes

Base Route

```txt
/api/cart
```

POST `/add`

Body:

```json
{
  "productId": "...",
  "quantity": 1,
  "size": "M"
}
```

GET `/get`

PATCH `/update`

DELETE `/delete/:productId/:size`

---

# Wishlist Routes

Base Route

```txt
/api/wishlist
```

POST `/toggle`

GET `/`

DELETE `/:productId`

---

# Admin Routes

Base Route

```txt
/api/admin
```

POST `/product/create`

PUT `/product/:id`

DELETE `/product/:id`

GET `/products`

GET `/users`

GET `/user/:id`

DELETE `/user/:id`