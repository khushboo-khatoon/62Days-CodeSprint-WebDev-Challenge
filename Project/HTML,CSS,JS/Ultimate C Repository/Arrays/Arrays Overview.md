# Arrays in C

Arrays are contiguous memory locations that store multiple elements of the same data type. They provide efficient indexed access to data.

**Key concepts:**
- One-dimensional (1D) arrays

```
       ┌────┬────┬────┬────┬────┐
  arr  │ 10 │ 20 │ 30 │ 40 │ 50 │
       └────┴────┴────┴────┴────┘
       index:0   1   2   3   4
```

- Two-dimensional (2D) arrays / matrices

```
       col: 0     1     2
       ┌─────┬─────┬─────┐
  row 0│  1  │  2  │  3  │
       ├─────┼─────┼─────┤
  row 1│  4  │  5  │  6  │
       ├─────┼─────┼─────┤
  row 2│  7  │  8  │  9  │
       └─────┴─────┴─────┘
       arr[1][2] = 6
```

- Array initialization and traversal
- Inserting, updating, and searching elements
- Matrix addition and multiplication
- Sorting array elements
- Finding maximum, sum, and occurrences
