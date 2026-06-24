# Stacks in C

Stacks follow the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end — the top.

**Key concepts:**
- Array-based representation of a stack
- Structure-based implementation with `typedef`
- `push()` — Add element to the top
- `pop()` — Remove element from the top
- `peek()` — View the top element without removing
- `isEmpty()` — Check if stack is empty
- `isFull()` — Check if stack is full
- Printing all elements of a stack

```
      ▲
  ┌──────┐
  │  30  │ <- Top (most recent)
  ├──────┤
  │  20  │
  ├──────┤
  │  10  │ <- Bottom
  └──────┘
  LIFO: Last In, First Out
```