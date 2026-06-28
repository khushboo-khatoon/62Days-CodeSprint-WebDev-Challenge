# Security Documentation

# Authentication Flow

```txt
Register
 ↓
Generate OTP
 ↓
Send Email
 ↓
Verify OTP
 ↓
Account Activated
```

---

# Login Flow

```txt
User Login
 ↓
Validate Credentials
 ↓
Generate Access Token
 ↓
Generate Refresh Token
 ↓
Store Session
 ↓
Response
```

---

# Refresh Token Flow

```txt
Access Token Expired
 ↓
Rotate Token API
 ↓
Validate Refresh Token
 ↓
Generate New Access Token
 ↓
Generate New Refresh Token
 ↓
Update Session
 ↓
Response
```

---

# Logout Flow

```txt
Logout
 ↓
Delete Session
 ↓
Clear Cookie
 ↓
Success
```

---

# Authorization

```txt
Request
 ↓
authMiddleware
 ↓
JWT Validation
 ↓
Protected Route
```

---

# Admin Authorization

```txt
Request
 ↓
authMiddleware
 ↓
adminMiddleware
 ↓
Admin Route Access
```

---

# Security Features

- JWT Authentication
- HTTP Only Cookies
- Password Hashing (Bcrypt)
- OTP Verification
- Refresh Token Rotation
- Session Tracking
- Role Based Access Control
- Protected Routes