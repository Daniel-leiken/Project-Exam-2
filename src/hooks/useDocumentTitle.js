import { useEffect } from 'react';

/**
 * Set the document title for the current page, suffixed with the app name.
 * Helps screen readers announce navigation and improves bookmarks/SEO.
 *
 * @param {string} [title] - Page title without the suffix; omit for just "Holidaze".
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Holidaze` : 'Holidaze';
  }, [title]);
}
