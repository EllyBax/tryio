# tryio

[![npm version](https://badge.fury.io/js/tryio.svg)](https://www.npmjs.com/package/tryio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`tryio` is a helpful tool for handling errors in your code. It wraps your functions and promises, allowing you to easily manage errors without the need for repetitive `try...catch` blocks. With `tryio`, you get a simple way to work with async code while keeping it clean and easy to read based off of [trysafely](https://www.npmjs.com/package/trysafely).

## How to Use

`tryio` provides three main ways to handle your operations:

1. **Using `tryAsync(fn: () => Promise<T>)`:** This wraps a function that returns a promise. It catches any errors that happen when the function runs.
2. **Using `tryPromise(promise: Promise<T>)`:** This wraps an already-created promise, which is useful when the promise is already running.
3. **Using `trySync(fn: () => T)`:** This wraps a synchronous function and catches any errors that occur during its execution.

---

### Basic Example with `tryAsync`

Wrap your async function in `tryAsync` to get a `[data, error]` pair. This is great for deferring the execution of your async operation.

```typescript
import { tryAsync } from 'tryio';

// Function to fetch user details
async function fetchUserDetails(userId: string): Promise<{ id: string; name: string }> {
  await new Promise(resolve => setTimeout(resolve, 100));

  if (userId === "user123") {
    return { id: "user123", name: "Alice" };
  } else if (userId === "errorUser") {
    throw new Error("Network error during fetch!");
  } else {
    throw "Invalid User ID format.";
  }
}

async function getUser() {
  const [user, err] = await tryAsync(() => fetchUserDetails("user123"));

  if (err) {
    console.error("Failed to get user:", err.message);
  } else {
    console.log("User data:", user);
  }

  const [errorUser, errorErr] = await tryAsync(() => fetchUserDetails("errorUser"));

  if (errorErr) {
    console.error("Failed to get error user:", errorErr.message);
  }

  const [unknownUser, unknownErr] = await tryAsync(() => fetchUserDetails("unknownUser"));

  if (unknownErr) {
    console.error("Failed to get unknown user:", unknownErr.message);
  }
}

getUser();
```

---

### Example with `tryPromise`

If you already have a promise, you can use `tryPromise` to wrap it directly.

```typescript
import { tryAsync, tryPromise } from 'tryio';

async function fetchConfig(): Promise<{ theme: string; debug: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return { theme: "dark", debug: false };
}

async function retrieveData() {
  const [config, configErr] = await tryPromise(fetchConfig());

  if (configErr) {
    console.error("Failed to fetch config:", configErr.message);
  } else {
    console.log("Config loaded:", config);
  }
}

retrieveData();
```

---

### Example with `trySync`

For synchronous operations, you can use `trySync` to handle errors without needing a `try...catch` block.

```typescript
import { trySync } from 'tryio';

// Function to parse a JSON string
function parseJson(jsonString: string): object {
  return JSON.parse(jsonString);
}

const [data, parseError] = trySync(() => parseJson('{"key": "value"}'));

if (parseError) {
  console.error("Failed to parse JSON:", parseError.message);
} else {
  console.log("Parsed data:", data);
}
```

---

### Using with `Promise.all`

`tryAsync` and `tryPromise` work well together when you need to handle multiple async operations at once.

```typescript
import { tryAsync, tryPromise } from 'tryio';

async function loadDashboard() {
  const [salesResult, inventoryResult, analyticsResult] = await Promise.all([
    tryAsync(() => fetchSalesData()),
    tryPromise(fetchInventoryData()),
    tryAsync(() => fetchAnalyticsSummary()),
  ]);

  // Handle results...
}

loadDashboard();
```

---

## Key Features

- **No More Boilerplate:** Say goodbye to long `try...catch` blocks. Use `tryio` to handle errors in a single line.
- **Clear Error Handling:** Always get a `[result, error]` pair, making it easy to check for errors.
- **Handles Both Async and Sync Errors:** Works for both promise rejections and errors thrown during function execution.
- **TypeScript Support:** Fully typed for a better coding experience and safety.
- **Lightweight:** Minimal overhead, focusing on simplifying async error handling.
- **Three Ways to Use:** You can wrap a function that returns a promise, directly wrap an existing promise, or handle synchronous functions.

## Installation

To install `tryio`, run one of the following commands:

```bash
npm install tryio
# or
yarn add tryio
# or
pnpm add tryio
```

## Why Choose `tryio`?

Using `tryio` makes your code easier to read and maintain. Instead of dealing with complex error handling, you can focus on what your code does. It helps you see where errors happen and keeps your async code clean and predictable.

## When to Use `trysafely` Instead

While `tryio` provides a simple and clean error handling approach, if you need stricter TypeScript typing where successful results aren't marked as possibly null after error checking, consider using [trysafely](https://www.npmjs.com/package/trysafely). It offers a more type-strict implementation that can provide better compile-time guarantees for your error handling patterns.

## Contributing

We welcome contributions! If you have ideas, bug reports, or want to help with code, please open an issue or pull request on the [GitHub repository](https://github.com/EllyBax/tryio.git).

## License

`tryio` is [MIT licensed](LICENSE).