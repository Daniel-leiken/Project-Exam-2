import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { buttonVariants } from '@/components/ui/button-variants';

/** 404 page shown for unmatched routes. */
function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center px-5 py-24 text-center lg:px-20">
      <p className="font-display text-6xl font-semibold text-primary-900">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-neutral-900">Page not found</h1>
      <p className="mt-2 text-neutral-700">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link to="/" className={`mt-8 inline-flex ${buttonVariants()}`}>
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
