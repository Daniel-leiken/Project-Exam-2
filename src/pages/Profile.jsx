import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateAvatar } from '@/api/profiles';
import { getMyBookings } from '@/api/bookings';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useApiQuery } from '@/hooks/useApiQuery';
import { isValidUrl } from '@/utils/validation';
import { formatDate } from '@/utils/format';
import { Card, CardContent } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

/**
 * Profile page (protected): shows the signed-in user, lets them update their
 * avatar, and lists their upcoming bookings.
 */
function Profile() {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url ?? '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const bookingsQuery = useCallback(() => getMyBookings(user.name), [user.name]);
  const { data, loading } = useApiQuery(bookingsQuery);
  const upcoming = (data?.data ?? []).filter((booking) => new Date(booking.dateTo) >= new Date());

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValidUrl(avatarUrl)) {
      setError('Enter a valid image URL.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const alt = `${user.name}'s avatar`;
      const updated = await updateAvatar(user.name, { url: avatarUrl, alt });
      updateUser({ avatar: updated.avatar });
      toast.success('Avatar updated.');
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-20">
      <header className="flex items-center gap-4">
        {user?.avatar?.url && (
          <img
            src={user.avatar.url}
            alt={user.avatar.alt || `${user.name}'s avatar`}
            className="h-16 w-16 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary-900">{user?.name}</h1>
          <p className="text-neutral-700">{user?.email}</p>
          {user?.venueManager && (
            <span className="mt-1 inline-block rounded-sm bg-primary-100 px-2 py-0.5 text-sm text-primary-900">
              Venue manager
            </span>
          )}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold text-neutral-900">Update avatar</h2>
            <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
              <FormField
                label="Avatar URL"
                type="url"
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                error={error}
                placeholder="https://…"
              />
              <Button type="submit" loading={submitting}>
                Save avatar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Upcoming bookings</h2>
          {loading ? (
            <div className="py-10">
              <Spinner label="Loading bookings…" />
            </div>
          ) : upcoming.length === 0 ? (
            <p className="mt-3 text-neutral-500">
              No upcoming bookings yet.{' '}
              <Link to="/venues" className="font-medium text-primary-900 underline">
                Find a place to stay
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {upcoming.map((booking) => (
                <li key={booking.id}>
                  <Card>
                    <CardContent className="flex items-center justify-between gap-4">
                      <div>
                        {booking.venue ? (
                          <Link
                            to={`/venues/${booking.venue.id}`}
                            className="font-medium text-neutral-900 hover:text-primary-900"
                          >
                            {booking.venue.name}
                          </Link>
                        ) : (
                          <span className="font-medium text-neutral-900">Venue unavailable</span>
                        )}
                        <p className="mt-1 text-sm text-neutral-500">
                          {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm text-neutral-700">
                        {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                      </span>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
