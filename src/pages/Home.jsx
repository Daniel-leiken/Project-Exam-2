import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, Compass, Search, ShieldCheck } from 'lucide-react';
import { getVenues } from '@/api/venues';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { VenueCard } from '@/components/venue/VenueCard';

const VALUE_PROPS = [
  {
    icon: Compass,
    title: 'Unique places',
    text: 'Handpicked stays in every corner of the world, from coastal cabins to city lofts.',
  },
  {
    icon: CalendarCheck,
    title: 'Easy booking',
    text: 'Check real-time availability and reserve your dates in just a few clicks.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted hosts',
    text: 'Every venue is run by a registered manager, so you always know who you’re booking with.',
  },
];

/** Landing page: a hero with search, a grid of featured venues, and value props. */
function Home() {
  useDocumentTitle();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const queryFn = useCallback(() => getVenues({ limit: 8 }), []);
  const { data, loading } = useApiQuery(queryFn);
  const featured = data?.data ?? [];

  function handleSearch(event) {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/venues?q=${encodeURIComponent(query)}` : '/venues');
  }

  return (
    <>
      <section className="relative overflow-hidden bg-primary-900 text-white">
        <img
          src="/hero.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Teal overlay keeps white text at AAA contrast over the photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-900/60"
        />

        <div className="relative mx-auto max-w-screen-xl px-5 py-24 lg:px-20 lg:py-32">
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Find somewhere you’ll never want to leave
          </h1>
          <p className="mt-4 max-w-xl text-lg text-primary-100">
            Explore unique stays around the world and book your next getaway in minutes.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-primary-900"
          >
            <Search className="ml-3 h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search destinations or stays…"
              aria-label="Search venues"
              className="min-w-0 flex-1 appearance-none bg-transparent text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="shrink-0 rounded-full">
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-neutral-900">Featured stays</h2>
            <p className="mt-1 text-neutral-700">A few of our favourite places right now.</p>
          </div>
          <Link
            to="/venues"
            className="shrink-0 text-sm font-medium text-primary-900 underline hover:text-primary-700"
          >
            View all
          </Link>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" label="Loading venues…" />
            </div>
          ) : featured.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((venue) => (
                <li key={venue.id}>
                  <VenueCard venue={venue} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-12 text-center text-neutral-500">No venues to show yet.</p>
          )}
        </div>
      </section>

      <section className="border-t border-neutral-300 bg-white">
        <div className="mx-auto grid max-w-screen-xl gap-8 px-5 py-16 sm:grid-cols-3 lg:px-20">
          {VALUE_PROPS.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-900">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
              <p className="mt-1 text-neutral-700">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
