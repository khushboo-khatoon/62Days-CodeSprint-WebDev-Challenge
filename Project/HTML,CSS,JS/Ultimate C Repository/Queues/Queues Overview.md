# Queues in C

Queues follow the First-In-First-Out (FIFO) principle. Elements are added at the rear and removed from the front.

- **Simple Queue**: Basic FIFO linear queue

```
  dequeue ◄── Front              Rear ◄── enqueue
                │                  │
                ▼                  ▼
              ┌────┬────┬────┬────┬────┐
              │ 10 │ 20 │ 30 │ 40 │    │
              └────┴────┴────┴────┴────┘
              FIFO: First In, First Out
```

- **Circular Queue**: Wraps around to reuse empty slots at the front

```
  Front = 2                   Rear = 1 (wraps around)
    │                           │
    ▼                           ▼
  ┌────┬────┬────┬────┬────┐
  │ 60 │    │ 30 │ 40 │ 50 │ ← Rear wraps to index 1
  └────┴────┴────┴────┴────┘
    0    1    2    3    4
  Enqueue fills the next available slot modulo N
```

- **Priority Queue**: Elements dequeued by priority, not insertion order

```
  enqueue:   (Job A, prio 3)          dequeue order (highest priority first):
             (Job B, prio 1)  ──►      1. Job B (prio 1)
             (Job C, prio 2)           2. Job C (prio 2)
                                        3. Job A (prio 3)
```

**Key concepts:**
- Simple queue implementation using arrays and structures
- `enqueue()` — Add element at the rear
- `dequeue()` — Remove element from the front
- `peek()` — View the front element without removing
- Circular queues for efficient memory usage
- Priority queues
