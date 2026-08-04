/**
 * Display formatting helpers.
 * @module utils/format
 */

/**
 * Format a nightly price as `NOK 2,450`.
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return `NOK ${new Intl.NumberFormat('en-US').format(amount)}`;
}

/**
 * Format a date as `5 Sep 2026`.
 * @param {string|Date} value
 * @returns {string}
 */
export function formatDate(value) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
