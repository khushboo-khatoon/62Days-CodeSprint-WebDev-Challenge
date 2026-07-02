# 🧮 Advanced Data Structures, Searching & Sorting Algorithms

This section covers advanced user-defined data structures and algorithmic techniques essential for solving complex programming problems efficiently.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    Advanced DSA & Algorithms                              │
├──────────┬──────────┬────────────┬────────┬────────┬────────┬────────────┤
│Structures│  Unions  │  Linked    │ Stacks │ Queues │ Trees  │  Graphs    │
│  struct  │  union   │   Lists    │  LIFO  │  FIFO  │  BST   │  Adj Matrix│
│  typedef │  share   │Singly/Doubl│ push/  │enqueue/│  Bin   │  BFS/DFS   │
│          │  memory  │/Circular   │ pop    │dequeue │  Tree  │            │
└──────────┴──────────┴────────────┴────────┴────────┴────────┴────────────┘
```

## 📋 What You'll Learn

### Structures
Structures (`struct`) in C allow grouping variables of different data types under a single name. Topics include: defining and using structures, `typedef` for creating type aliases, nested structures, copying structures, arrays of structures, passing structures to functions, and structures with pointers.

```
  struct Student {
      int id;          // 4 bytes
      char name[50];   // 50 bytes
      float marks;     // 4 bytes
  };
```

### Unions
Unions are similar to structures but share memory space among all members, storing only one member's value at a time. Useful for memory-constrained applications and type-punning.

```
  union Data {
      int i;           // 4 bytes
      float f;         // 4 bytes
      char str[20];    // 20 bytes ← union size
  };
  // All members share the same starting address
```

### Linked Lists
Linked lists are dynamic linear data structures where elements (nodes) are connected via pointers. Topics include:
- **Singly Linked List**: Creation, insertion/deletion at front/rear, searching by position
- **Doubly Linked List**: Insertion/deletion at front/rear with forward and backward traversal
- **Circular Linked List**: Circular singly and doubly linked lists, with and without tail pointers

```
  ┌──────┐    ┌──────┐    ┌──────┐
  │ 10   │    │ 20   │    │ 30   │
  │ next─┼───>│ next─┼───>│ next─┼───>NULL
  └──────┘    └──────┘    └──────┘
  Singly Linked List
```

### Stacks
Stacks follow the Last-In-First-Out (LIFO) principle. Topics include: array representation, structure-based implementation, `push()`, `pop()`, `peek()`, `isEmpty()`, `isFull()`, and applications like infix-to-postfix conversion, postfix evaluation, parenthesis balancing, browser backtracking simulation, and string reversal.

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

### Queues
Queues follow the First-In-First-Out (FIFO) principle. Topics include: simple queue implementation using arrays and structures, `enqueue()`, `dequeue()`, `peek()`, circular queues for efficient memory usage, and priority queues.

```
  Front            Rear
    │                │
    ▼                ▼
  ┌────┬────┬────┬────┬────┐
  │ 10 │ 20 │ 30 │ 40 │    │
  └────┴────┴────┴────┴────┘
  FIFO: First In, First Out
```

### Trees
Trees are hierarchical data structures consisting of nodes connected by edges. Topics include:
- **Binary Tree**: Each node has at most 2 children (left and right)
- **Binary Search Tree (BST)**: Ordered tree where left child < parent < right child
- **Tree Traversals**: Preorder (Root→Left→Right), Inorder (Left→Root→Right), Postorder (Left→Right→Root)
- **BST Operations**: Insert, search, delete, find minimum and maximum

```
        ┌──── 10 ────┐
        │             │
     ┌──5──┐      ┌──15──┐
     │     │      │     │
     3     7     12    20

  Inorder:   3  5  7 10 12 15 20  (sorted order)
  Preorder: 10  5  3  7 15 12 20
  Postorder: 3  7  5 12 20 15 10
```

### Graphs
Graphs represent networks of connected nodes (vertices and edges). Topics include:
- **Adjacency Matrix Representation**: Accepting user input for directed/undirected and weighted/unweighted graphs, BFS and DFS traversals
- **Adjacency List Representation**: Node creation, edge/vertex addition and deletion, BFS and DFS traversals

```
    0 ───── 1
    │       │
    │       │
    2 ───── 3

  Adjacency Matrix:
    0 1 2 3
  0 0 1 1 0
  1 1 0 0 1
  2 1 0 0 1
  3 0 1 1 0
```

### Searching and Sorting
Classic algorithms for data retrieval and ordering:
- **Linear Search**: Sequential search through unsorted data — O(n)
- **Binary Search**: Efficient search on sorted arrays using divide-and-conquer — O(log n)
- **Bubble Sort**: Simple comparison-based sorting with adjacent swaps — O(n²)
- **Selection Sort**: In-place comparison sort by repeatedly finding the minimum element — O(n²)
