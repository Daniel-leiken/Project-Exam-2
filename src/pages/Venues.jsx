import { useCallback, useState } from 'react';
import { getVenues, searchVenues } from '@/api/venues';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchBar } from '@/components/venue/SearchBar';
import { VenueCard } from '@/components/venue/VenueCard';
import { Pagination } from '@/components/Pagination';
import { Spinner } from '@/components/ui/Spinner';

/**
 * Venue browsing page: a searchable, paginated grid of venues. An empty search
 * lists all venues; typing switches to the search endpoint (debounced).
 */
function Venues() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query);
  const search = debouncedQuery.trim();

  // Restart at page 1 whenever the search term changes (adjust state during
  // render, per the React "you might not need an effect" guidance).
  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setPage(1);
  }

  const queryFn = useCallback(
    () => (search ? searchVenues({ q: search, page }) : getVenues({ page })),
    [search, page]
  );
  const { data, loading, error } = useApiQuery(queryFn);

  const venues = data?.data ?? [];
  const pageCount = data?.meta?.pageCount ?? 1;

  return (
    <section className="mx-auto max-w-screen-xl px-5 py-12 lg:px-20">
      <h1 className="font-display text-3xl font-semibold text-primary-900">Browse venues</h1>
      <p className="mt-2 text-neutral-700">Find your next stay from our collection of places.</p>

      <div className="mt-6 max-w-xl">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" label="Loading venues…" />
          </div>
        ) : error ? (
          <p role="alert" className="py-20 text-center text-danger">
            Couldn&apos;t load venues. {error.message}
          </p>
        ) : venues.length === 0 ? (
          <p className="py-20 text-center text-neutral-500">
            No venues found{search ? ` for “${search}”` : ''}.
          </p>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {venues.map((venue) => (
                <li key={venue.id}>
                  <VenueCard venue={venue} />
                </li>
              ))}
            </ul>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          </>
        )}
      </div>
    </section>
  );
}

export default Venues;
