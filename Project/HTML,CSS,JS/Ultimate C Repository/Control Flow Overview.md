# 🔄 Control Flow

Control flow statements in C determine the order in which program instructions are executed. They enable decision-making, repetition, and branching logic in programs.

```
                    ┌───────────────┐
                    │    Start      │
                    └───────┬───────┘
                            │
                    ┌───────▼───────┐
              ┌─────│ Condition?    │─────┐
              │     └───────┬───────┘     │
              │             │             │
       ┌──────▼──────┐     │      ┌──────▼──────┐
       │  if/else    │     │      │   Loops     │
       │  switch     │     │      │ for/while/  │
       │  case       │     │      │ do-while    │
       └─────────────┘     │      └─────────────┘
                           │
                    ┌──────▼──────┐
                    │  Jump:      │
                    │ break/      │
                    │ continue/   │
                    │ goto        │
                    └─────────────┘
```

## 📋 What You'll Learn

### Conditional Statements
Conditional statements allow the program to make decisions and execute different code paths based on certain conditions. C supports:

- **`if-else` statement** — Execute code blocks based on boolean conditions
- **`if-else if` ladder** — Test multiple conditions in sequence
- **`switch-case` statement** — Multi-way branching based on integral values
- **Nested `if` statements** — `if` statements inside other `if` statements

Examples include: Arithmetic calculator, odd/even check, student grade determination, and day of week display.

### Looping Statements
Loops allow repetitive execution of code blocks. C provides three looping constructs:

- **`for` loop** — Best when the number of iterations is known in advance
- **`while` loop** — Best when repetition depends on a condition being true
- **`do-while` loop** — Similar to while, but guarantees at least one execution of the loop body
- **Nested loops** — Loops within loops, typically used for multi-dimensional data processing and pattern printing

Examples include: Multiplication tables, Fibonacci series generation, number patterns, digit sum calculation, palindrome checking, and more.

### Jumping Statements
Jumping statements alter the normal sequential flow of program execution:

- **`break`** — Terminates the nearest enclosing loop or switch statement immediately
- **`continue`** — Skips the rest of the current iteration and proceeds to the next iteration
- **`goto`** — Unconditionally transfers control to a labeled statement in the program
