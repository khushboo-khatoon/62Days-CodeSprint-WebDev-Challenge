# Unions in C

Unions are similar to structures but share memory space among all members, storing only one member's value at a time. Useful for memory-constrained applications and type-punning.

**Key concepts:**
- Defining and using unions
- Array of unions
- Union with pointers
- Union with `typedef`

```c
  union Data {
      int i;           // 4 bytes
      float f;         // 4 bytes
      char str[20];    // 20 bytes ← union size
  };
  // All members share the same starting address
```