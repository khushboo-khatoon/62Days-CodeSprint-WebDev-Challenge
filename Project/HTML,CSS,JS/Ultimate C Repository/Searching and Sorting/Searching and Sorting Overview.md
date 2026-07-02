# Searching and Sorting in C

Classic algorithms for data retrieval and ordering. These fundamental algorithms are essential for efficient data processing.

**Key concepts:**
- **Linear Search**: Sequential search through unsorted data — O(n)

```
  Array: [10, 23, 5, 78, 42, 19]
  Search: 42

  Step 1: [10] ──✗ not 42
  Step 2: [23] ──✗ not 42
  Step 3: [5]  ──✗ not 42
  Step 4: [78] ──✗ not 42
  Step 5: [42] ──✓ Found at index 4
```

- **Binary Search**: Efficient search on sorted arrays using divide-and-conquer — O(log n)

```
  Array: [5, 10, 19, 23, 42, 78]  (sorted)
  Search: 42

  Step 1: [5  10  19 |23| 42  78]  mid=23, 42>23 → right half
  Step 2: [42 |78]                  mid=78, 42<78 → left half
  Step 3: [|42|]                    mid=42 ✓ Found!
```

- **Bubble Sort**: Simple comparison-based sorting with adjacent swaps — O(n²)

```
  Pass 1: [10  23  5  78  42  19]
   → [10  5  23  78  42  19]  (swap 23↔5)
   → [10  5  23  42  78  19]  (swap 78↔42)
   → [10  5  23  42  19  78]  (swap 78↔19)
   Largest 78 bubbled to end

  Pass 2: [5  10  23  19  42  78]
   → [5  10  19  23  42  78]  (swap 23↔19)
   Sorted!
```

- **Selection Sort**: In-place comparison sort by repeatedly finding the minimum element — O(n²)

```
  Step 1: [10  23  5  78  42  19]  min=5, swap 10↔5
  Step 2: [5  23  10  78  42  19]  min=10, swap 23↔10
  Step 3: [5  10  23  78  42  19]  min=19, swap 23↔19
  Step 4: [5  10  19  78  42  23]  min=23, swap 78↔23
  Step 5: [5  10  19  23  42  78]  min=42, swap 78↔42
  Sorted: [5  10  19  23  42  78]
```
