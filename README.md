
# tryio

[![npm version](https://badge.fury.io/js/tryio.svg)](https://www.npmjs.com/package/tryio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`tryio` is a helpful tool for handling errors in asynchronous code. It wraps your functions and promises, allowing you to easily manage errors without the need for repetitive `try...catch` blocks. With `tryio`, you get a simple way to work with async code while keeping it clean and easy to read.

## Key Features

- **No More Boilerplate:** Say goodbye to long `try...catch` blocks. Use `tryio` to handle errors in a single line.
- **Clear Error Handling:** Always get a `[result, error]` pair, making it easy to check for errors.
- **Handles Both Async and Sync Errors:** Works for both promise rejections and errors thrown during function execution.
- **TypeScript Support:** Fully typed for a better coding experience and safety.
- **Lightweight:** Minimal overhead, focusing on simplifying async error handling.
- **Two Ways to Use:** You can wrap a function that returns a promise or directly wrap an existing promise.

## Installation

To install `tryio`, run one of the following commands:

```bash
npm install tryio
# or
yarn add tryio
# or
pnpm add tryio
```

## How to Use

`tryio` provides two main ways to handle your async operations:

1. **Using `tryio(fn: () => Promise<T>)`:** This wraps a function that returns a promise. It catches any errors that happen when the function runs.
2. **Using `tryPromise(promise: Promise<T>)`:** This wraps an already-created promise, which is useful when the promise is already running.

---

### Basic Example with `tryio`

Wrap your async function in `tryio` to get a `[data, error]` pair. This is great for deferring the execution of your async operation.

```typescript
import tryio from 'tryio';

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
  const [user, err] = await tryio(() => fetchUserDetails("user123"));

  if (err) {
    console.error("Failed to get user:", err.message);
  } else {
    console.log("User data:", user);
  }

  const [errorUser, errorErr] = await tryio(() => fetchUserDetails("errorUser"));

  if (errorErr) {
    console.error("Failed to get error user:", errorErr.message);
  }

  const [unknownUser, unknownErr] = await tryio(() => fetchUserDetails("unknownUser"));

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
import tryio from 'tryio';
import tryPromise from 'tryio/promises';

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

### Using with `Promise.all`

`tryio` and `tryPromise` work well together when you need to handle multiple async operations at once.

```typescript
import tryio from 'tryio';
import tryPromise from 'tryio/promises';

async function loadDashboard() {
  const [salesResult, inventoryResult, analyticsResult] = await Promise.all([
    tryio(() => fetchSalesData()),
    tryPromise(fetchInventoryData()),
    tryio(() => fetchAnalyticsSummary()),
  ]);

  // Handle results...
}

loadDashboard();
```

---

## Why Choose `tryio`?

Using `tryio` makes your code easier to read and maintain. Instead of dealing with complex error handling, you can focus on what your code does. It helps you see where errors happen and keeps your async code clean and predictable.

## Contributing

We welcome contributions! If you have ideas, bug reports, or want to help with code, please open an issue or pull request on the [GitHub repository](https://github.com/EllyBax/tryio.git).

## Future Plans

- [ ] Add support for synchronous functions.
- [ ] Improve documentation with more examples.
- [ ] Explore better error handling options.

## License

`tryio` is [MIT licensed](LICENSE).