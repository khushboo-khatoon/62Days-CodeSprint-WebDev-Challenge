# Dynamic Memory Allocation in C

C provides functions from `<stdlib.h>` to manage memory at runtime on the heap.

**Key concepts:**
- `malloc()` — Allocates specified bytes of memory
- `calloc()` — Allocates memory for an array of elements, initialized to zero
- `realloc()` — Resizes previously allocated memory block
- `free()` — Deallocates dynamically allocated memory
- Allocating arrays of varying sizes during program execution
- Heap Memory — The **heap** is a region of memory used for runtime dynamic allocation. Unlike the stack, heap memory persists until explicitly freed with `free()`, making it ideal for data structures whose size is unknown at compile time.

```
  ┌─────────────────────┐
  │  malloc(n*sizeof)   │
  │  calloc(n, sizeof)  │
  │  realloc(ptr, newsz)│
  │  free(ptr)          │
  └─────────────────────┘
