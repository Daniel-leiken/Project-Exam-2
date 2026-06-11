/** Noroff accounts must use a stud.noroff.no email address. */
export function isStudEmail(email) {
  return /^[\w.-]+@stud\.noroff\.no$/i.test(email.trim());
}

/** Usernames may only contain letters, numbers and underscores. */
export function isValidUsername(name) {
  return /^[\w]+$/.test(name.trim());
}

export function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
