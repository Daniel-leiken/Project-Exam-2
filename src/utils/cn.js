import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names and resolve conflicting Tailwind utilities
 * (e.g. cn('px-4', condition && 'px-6') keeps only the last padding).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
