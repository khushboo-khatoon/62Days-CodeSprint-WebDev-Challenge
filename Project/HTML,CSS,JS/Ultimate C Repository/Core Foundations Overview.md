# 🛠️ Core Foundations

This section covers the fundamental building blocks of C programming — the essential concepts you need to understand before writing any meaningful C code.

```
┌─────────────────────────────────────────────────────────┐
│                    C Core Foundations                    │
├─────────────┬───────────┬──────────┬────────────────────┤
│  Variables  │  I/O      │Operators │  Type Conversion   │
│  & Data     │  printf() │ & Bitwise│  & Preprocessor    │
│  Types      │  scanf()  │  Ops     │  Directives        │
└─────────────┴───────────┴──────────┴────────────────────┘
```

## 📋 What You'll Learn

### Variables
Variables are named memory locations used to store data. In C, every variable must be declared with a specific data type before use. C supports several fundamental data types including `int`, `float`, `char`, `double`, and `void`.

### Input and Output Functions
Standard Input/Output functions in C provide the interface between the program and the user. The `<stdio.h>` header provides `printf()` for formatted output and `scanf()` for formatted input.

### Operators
C provides a rich set of operators for performing various operations:
- **Arithmetic Operators**: `+`, `-`, `*`, `/`, `%`
- **Relational Operators**: `==`, `!=`, `>`, `<`, `>=`, `<=`
- **Logical Operators**: `&&`, `||`, `!`
- **Bitwise Operators**: `&`, `|`, `^`, `~`, `<<`, `>>`
- **Assignment Operators**: `=`, `+=`, `-=`, etc.
- **Conditional (Ternary) Operator**: `?:`
- **Special Operators**: `sizeof()`, `&` (address-of), `,` (comma)

Includes sub-topics: Bitwise Operators (AND, OR, XOR, NOT), Conditional Operator (ternary), Logical Operators (increment/decrement), and practical examples.

### Type Conversion
Type conversion (type casting) in C allows converting a value from one data type to another. C supports both implicit type conversion (automatic by the compiler) and explicit type conversion (manually specified by the programmer using the `(type)` cast syntax).

### Preprocessor Directives and Macros
The C preprocessor processes directives before compilation. These directives begin with `#` and include:
- `#define` — Macro definitions and symbolic constants
- `#include` — File inclusion for headers
- Parameterized macros — Macros that accept arguments (function-like macros)
- Nested macros — Macros defined in terms of other macros
- X-Macros — An advanced technique for maintaining lists of data and code generation
