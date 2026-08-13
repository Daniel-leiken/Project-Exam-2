import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Spinner } from '@/components/ui/Spinner';

/**
 * App shell used as the layout route: a keyboard skip link, sticky header, the
 * routed page rendered through `<Outlet>` as the main landmark, and the footer.
 * Resets scroll on navigation and shows a fallback while lazy pages load.
 */
function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <Spinner size="lg" label="Loading…" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export { Layout };
