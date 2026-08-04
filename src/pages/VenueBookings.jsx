import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { getVenue } from '@/api/venues';
import { useAuth } from '@/hooks/useAuth';
import { useApiQuery } from '@/hooks/useApiQuery';
import { formatDate } from '@/utils/format';
import { Card, CardContent } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { buttonVariants } from '@/components/ui/button-variants';

/** Bookings for a single venue the current user manages (venue managers only). */
function VenueBookings() {
  const { id } = useParams();
  const { user } = useAuth();

  const queryFn = useCallback(() => getVenue(id), [id]);
  const { data, loading, error } = useApiQuery(queryFn);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" label="Loading bookings…" />
      </div>
    );
  }

  const venue = data?.data;

  if (error || !venue || venue.owner?.name !== user.name) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center">
        <p role="alert" className="text-danger">
          {error ? error.message : 'You can only view bookings for venues you manage.'}
        </p>
        <Link
          to="/manager"
          className={`mt-6 inline-flex ${buttonVariants({ variant: 'outline' })}`}
        >
          Back to dashboard
        </Link>
      </section>
    );
  }

  const bookings = [...(venue.bookings ?? [])].sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
  );

  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <Link
        to="/manager"
        className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold text-primary-900">
        Bookings for {venue.name?.trim() || 'this venue'}
      </h1>

      {bookings.length === 0 ? (
        <p className="mt-8 text-neutral-500">No bookings yet.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <Card>
                <CardContent className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-neutral-900">
                      {booking.customer?.name ?? 'Guest'}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-sm text-neutral-700">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {booking.guests}
                  </span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default VenueBookings;
