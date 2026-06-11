/**
 * Small, reusable form-validation helpers.
 * @module utils/validation
 */

/**
 * @param {string} email
 * @returns {boolean} True if the address ends in `@stud.noroff.no`.
 */
export function isStudEmail(email) {
  return /^[\w.-]+@stud\.noroff\.no$/i.test(email.trim());
}

/**
 * @param {string} name
 * @returns {boolean} True if the username is only letters, numbers and underscores.
 */
export function isValidUsername(name) {
  return /^[\w]+$/.test(name.trim());
}

/**
 * @param {string} value
 * @returns {boolean} True if the value parses as a URL.
 */
export function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
