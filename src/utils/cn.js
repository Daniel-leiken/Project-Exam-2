import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names and resolve conflicting Tailwind utilities
 * (e.g. `cn('px-4', condition && 'px-6')` keeps only the last padding).
 *
 * @param {...(string|false|null|undefined|Record<string, boolean>)} inputs - clsx-style class values.
 * @returns {string} The merged className string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
