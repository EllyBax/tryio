/**
 * A helper function to wrap an async operation and return a tuple of [result, error].
 * This avoids the need for explicit try...catch blocks in the caller.
 *
 * @template T The expected type of the successful result.
 * @param {() => Promise<T>} fn The asynchronous function to execute.
 * @returns {Promise<[T | null, Error | null]>} A Promise that resolves to a tuple.
 *   The first element is the successful result (or null if an error occurred).
 *   The second element is the error (or null if the operation was successful).
 */
export async function tryAsync<T>(
  fn: () => Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error: any) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}

/**
 * A helper function to wrap a promise and return a tuple of [result, error].
 * This differs from the one above since it requires you to call just the promise.
 *
 * @template T The expected type of the successful result.
 * @param {Promise<T>} promise The promise to execute.
 * @returns {Promise<[T | null, Error | null]>} A Promise that resolves to a tuple.
 *   The first element is the successful result (or null if an error occurred).
 *   The second element is the error (or null if the operation was successful).
 */
export async function tryPromise<T>(
  promise: Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    const result = await promise;
    return [result, null];
  } catch (error: any) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}

/**
 * A helper function to wrap a synchronous operation and return a tuple of [result, error].
 * This avoids the need for explicit try...catch blocks in the caller.
 *
 * @template T The expected type of the successful result.
 * @param {() => T} fn The synchronous function to execute.
 * @returns {[T | null, Error | null]} A tuple where the first element is the successful result
 *   (or null if an error occurred), and the second element is the error (or null if the operation was successful).
 */
export function trySync<T>(fn: () => T): [T | null, Error | null] {
  try {
    const result = fn();
    return [result, null];
  } catch (error: any) {
    const err = error instanceof Error ? error : new Error(String(error));
    return [null, err];
  }
}