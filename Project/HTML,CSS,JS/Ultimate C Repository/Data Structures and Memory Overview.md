# 🧩 Basic Data Structures, Pointers, Memory & File Management

This section covers the fundamental data structures in C along with pointer manipulation, dynamic memory handling, and file I/O operations.

```
┌──────────────────────────────────────────────────────────────────┐
│              Data Structures, Pointers & Memory                   │
├──────────┬──────────┬──────────┬──────────┬──────────┬───────────┤
│  Arrays  │ Strings  │Functions │ Pointers │ Dynamic  │   File    │
│  [1,2,3] │ "Hello"  │ f(x) { } │   *ptr   │  malloc  │  fprintf  │
│  1D, 2D  │ strcpy() │ call by  │   &var   │  calloc  │  fscanf   │
│          │ strcat() │ value/ref│ *arr + i │  realloc │  fread    │
└──────────┴──────────┴──────────┴──────────┴──────────┴───────────┘
```

## 📋 What You'll Learn

### Arrays
Arrays are contiguous memory locations that store multiple elements of the same data type. Topics include: 1D and 2D arrays, inserting and overwriting elements, matrix addition and multiplication, sorting, searching, and calculating sums and maximums.

```
       ┌────┬────┬────┬────┬────┐
  arr  │ 10 │ 20 │ 30 │ 40 │ 50 │
       └────┴────┴────┴────┴────┘
       index:0   1   2   3   4
```

### Strings
In C, strings are arrays of characters terminated by a null character (`\0`). Topics include: printing strings, arrays of strings, and standard string functions from `<string.h>` — `strlen()`, `strcpy()`, `strcat()`, `strcmp()`, `strrev()`, `strlwr()`, `strupr()`.

```
  ┌────┬────┬────┬────┬────┬────┬────┐
  │ 'H'│ 'e'│ 'l'│ 'l'│ 'o'│ '\0'│   │
  └────┴────┴────┴────┴────┴────┴────┘
    0    1    2    3    4    5
```

### Functions
Functions in C allow code modularization and reuse. Topics include: function definition and declaration, call by value vs. call by reference, passing arrays to functions, function arguments and return values, nested functions, and recursion.

```
  ┌──────────────┐     ┌──────────────┐
  │   main()     │────>│   add(a,b)   │
  │  calls add() │     │  returns sum │
  └──────────────┘     └──────────────┘
```

### Pointers
Pointers store memory addresses of variables and enable direct memory manipulation. Topics include: pointer declaration and initialization, accessing and modifying variables through pointers, pointer arithmetic (addition, subtraction), double pointers, and pointers with arrays and strings.

```
  Variable x           Pointer ptr
  ┌───────┐            ┌───────────┐
  │  42   │<───────────│ 0x7ff...  │
  └───────┘            └───────────┘
  Address: 0x7ff...     Stores address of x
```

### Dynamic Memory Allocation
C provides functions from `<stdlib.h>` to manage memory at runtime: `malloc()`, `calloc()`, and `realloc()` for allocation, and `free()` for deallocation. Includes examples of allocating arrays of varying sizes during program execution.

```
  Heap Memory
  ┌─────────────────────┐
  │  malloc(n*sizeof)   │
  │  calloc(n, sizeof)  │
  │  realloc(ptr, newsz)│
  │  free(ptr)          │
  └─────────────────────┘
```

### File Handling
File I/O in C uses functions from `<stdio.h>` to read from and write to external files. Topics include: writing and reading data with `fprintf()` and `fscanf()`, appending to files, copying file contents, and using `putw()` for writing integers.
