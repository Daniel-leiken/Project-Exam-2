import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Pencil, Plus, Trash2 } from 'lucide-react';
import { deleteVenue, getManagerVenues } from '@/api/venues';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useApiQuery } from '@/hooks/useApiQuery';
import { formatPrice } from '@/utils/format';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { buttonVariants } from '@/components/ui/button-variants';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Spinner } from '@/components/ui/Spinner';

/**
 * Venue-manager dashboard: lists the venues you own with quick actions to edit,
 * view bookings, or delete them, plus a link to create a new venue.
 */
function ManagerDashboard() {
  const { user } = useAuth();
  const toast = useToast();

  const queryFn = useCallback(() => getManagerVenues(user.name), [user.name]);
  const { data, loading, error, refetch } = useApiQuery(queryFn);
  const venues = data?.data ?? [];

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    setDeleting(true);
    try {
      await deleteVenue(pendingDelete.id);
      toast.success('Venue deleted.');
      setPendingDelete(null);
      refetch();
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="mx-auto max-w-screen-xl px-5 py-12 lg:px-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary-900">Your venues</h1>
          <p className="mt-2 text-neutral-700">Manage the places you host on Holidaze.</p>
        </div>
        <Link to="/manager/venues/new" className={buttonVariants()}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New venue
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" label="Loading your venues…" />
          </div>
        ) : error ? (
          <p role="alert" className="py-20 text-center text-danger">
            Couldn&apos;t load your venues. {error.message}
          </p>
        ) : venues.length === 0 ? (
          <p className="py-20 text-center text-neutral-500">
            You haven&apos;t created any venues yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {venues.map((venue) => {
              const bookingsCount = venue.bookings?.length ?? venue._count?.bookings ?? 0;
              return (
                <li key={venue.id}>
                  <Card>
                    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <ImageWithFallback
                        src={venue.media?.[0]?.url}
                        alt={venue.name?.trim() || 'Venue'}
                        className="h-24 w-full shrink-0 overflow-hidden rounded-md sm:w-32"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/venues/${venue.id}`}
                          className="font-semibold text-neutral-900 hover:text-primary-900"
                        >
                          {venue.name?.trim() || 'Untitled venue'}
                        </Link>
                        <p className="mt-1 text-sm text-neutral-700">
                          {formatPrice(venue.price)} / night
                        </p>
                        <p className="text-sm text-neutral-500">
                          {bookingsCount} booking{bookingsCount === 1 ? '' : 's'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/manager/venues/${venue.id}/edit`}
                          className={buttonVariants({ variant: 'outline', size: 'sm' })}
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                          Edit
                        </Link>
                        <Link
                          to={`/manager/venues/${venue.id}/bookings`}
                          className={buttonVariants({ variant: 'outline', size: 'sm' })}
                        >
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          Bookings
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => setPendingDelete(venue)}>
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete venue"
        description={
          pendingDelete
            ? `Delete “${pendingDelete.name?.trim() || 'this venue'}”? This can't be undone.`
            : ''
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setPendingDelete(null)}
      />
    </section>
  );
}

export default ManagerDashboard;
