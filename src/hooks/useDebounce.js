import { useEffect, useState } from 'react';

/**
 * Debounce a rapidly-changing value (e.g. a search field) so dependent effects
 * only run once the value settles.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay=400] - Delay in milliseconds.
 * @returns {T} The value after it has been stable for `delay` ms.
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
