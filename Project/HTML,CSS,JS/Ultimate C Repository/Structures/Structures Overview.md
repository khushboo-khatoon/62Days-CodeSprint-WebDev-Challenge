# Structures in C

Structures (`struct`) in C allow grouping variables of different data types under a single name.

**Key concepts:**
- Defining and using structures
- `typedef` keyword for creating type aliases
- Nested structures
- Copying elements of one structure to another
- Arrays of structures
- Passing structures to functions
- Structures with pointers

```c
  struct Student {
      int id;          // 4 bytes
      char name[50];   // 50 bytes
      float marks;     // 4 bytes
  };
```