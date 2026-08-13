import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll to the top of the page on every route change, so navigating to a new
 * page starts at the top rather than keeping the previous scroll position.
 * Renders nothing.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export { ScrollToTop };
