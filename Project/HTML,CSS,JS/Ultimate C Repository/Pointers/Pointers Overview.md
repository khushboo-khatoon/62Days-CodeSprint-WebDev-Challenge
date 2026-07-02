# Pointers in C

Pointers store memory addresses of variables and enable direct memory manipulation. They are one of the most powerful features of C.

**Key concepts:**
- Pointer declaration and initialization
- Accessing variables using pointers (`*`)
- Modifying variables using pointers
- Pointer arithmetic (addition, subtraction)
- Incrementing a pointer
- Double pointer (pointer to pointer)
- Pointer pointing to another pointer
- Pointers with arrays
- Pointers with strings

```
  Variable x           Pointer ptr
  ┌───────┐            ┌───────────┐
  │  42   │<───────────│ 0x7ff...  │
  └───────┘            └───────────┘
  Address: 0x7ff...     Stores address of x
```