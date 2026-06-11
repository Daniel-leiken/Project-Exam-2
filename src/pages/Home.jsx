import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button-variants';

/** Landing page: hero headline with a call-to-action into the venue list. */
function Home() {
  return (
    <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-20 lg:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold leading-tight text-primary-900 sm:text-5xl">
          Find somewhere you&apos;ll never want to leave
        </h1>
        <p className="mt-4 text-lg text-neutral-700">
          Explore vacation rentals worldwide and discover unique stays curated for every kind of
          traveler.
        </p>
        <Link to="/venues" className={`mt-8 inline-flex ${buttonVariants({ size: 'lg' })}`}>
          Browse venues
        </Link>
      </div>
    </section>
  );
}

export default Home;
