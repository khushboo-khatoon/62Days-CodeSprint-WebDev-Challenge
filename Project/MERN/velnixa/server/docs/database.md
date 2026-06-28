# Database Documentation

# User Model

```ts
{
  name: String,
  email: String,
  role: "admin" | "user",
  password: String,
  isVerified: Boolean
}
```

---

# Product Model

```ts
{
  name: String,
  description: String,
  price: Number,
  category: "MEN" | "WOMEN" | "KIDS",
  image: String,
  rating: Number,
  section: String
}
```

---

# Cart Model

```ts
{
  userId: ObjectId,
  items: [
    {
      productId,
      quantity,
      price,
      size
    }
  ],
  totalPrice
}
```

Available Sizes

```txt
S
M
L
XL
XXL
```

---

# Wishlist Model

```ts
{
  userId,
  items:[
    {
      productId,
      addedAt
    }
  ]
}
```

---

# OTP Model

```ts
{
  email,
  otp,
  expiresAt
}
```

---

# Session Model

```ts
{
  userId,
  token
}
```

---

# Relationships

```txt
User
 │
 ├── Cart
 │
 ├── Wishlist
 │
 └── Sessions

Product
 │
 ├── Cart Items
 │
 └── Wishlist Items
```