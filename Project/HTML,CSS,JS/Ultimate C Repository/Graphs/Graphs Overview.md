# Graphs in C

Graphs represent networks of connected nodes (vertices and edges). They can be directed or undirected, weighted or unweighted.

**Key concepts:**

- **Adjacency Matrix**: 2D array where `matrix[i][j] = 1` if edge exists between i and j

```
  Undirected Unweighted Graph:
    0 ───── 1
    │       │
    │       │
    2 ───── 3

  Adjacency Matrix (size V×V):
       0  1  2  3
    0 [0, 1, 1, 0]
    1 [1, 0, 0, 1]
    2 [1, 0, 0, 1]
    3 [0, 1, 1, 0]
    Symmetric for undirected graphs

  Weighted Directed Graph:
        ┌───┐
    0 ──►1  │
    │ 5  │  │
    │    ▼  │
    └───►2  │
       3 └───┘

  Adjacency Matrix (weights instead of 1):
       0   1   2
    0 [0,  5,  3]
    1 [0,  0,  2]
    2 [0,  0,  0]
```

- **Adjacency List**: Array of linked lists — each vertex stores its neighbours

```
  Same undirected graph:
    0 ───── 1
    │       │
    │       │
    2 ───── 3

  Adjacency List (V linked lists):
    0 ──► [1] ──► [2]
    1 ──► [0] ──► [3]
    2 ──► [0] ──► [3]
    3 ──► [1] ──► [2]
```

- **BFS (Breadth-First Search)**: Level-order traversal using a queue

```
  Graph:
    0 ───── 1
    │       │
    │       │
    2 ───── 3

  BFS starting from vertex 0:
  Queue: [0]
  Visit 0, enqueue neighbours 1, 2  →  Queue: [1, 2]
  Visit 1, enqueue neighbour 3      →  Queue: [2, 3]
  Visit 2, no unvisited neighbours   →  Queue: [3]
  Visit 3, done                      →  Queue: []

  BFS Order: 0 → 1 → 2 → 3  (level by level)
```

- **DFS (Depth-First Search)**: Deep traversal using recursion or a stack

```
  Graph:
    0 ───── 1
    │       │
    │       │
    2 ───── 3

  DFS starting from vertex 0 (using stack/recursion):
  Visit 0, go to first neighbour 1
  Visit 1, go to first neighbour 3
  Visit 3, go to first neighbour 2
  Visit 2, done

  DFS Order: 0 → 1 → 3 → 2  (goes deep before wide)

  Recursive call trace:
  dfs(0) → dfs(1) → dfs(3) → dfs(2)
```

- **Graph Operations**: Node and edge creation, addition, deletion, display
