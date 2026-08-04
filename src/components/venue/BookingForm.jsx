import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '@/api/bookings';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/format';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Booking widget for a venue: pick a date range (already-booked dates are
 * blocked), choose the guest count, and confirm. Unauthenticated users are
 * sent to log in first, returning here afterwards.
 *
 * @param {{ venue: object }} props
 */
function BookingForm({ venue }) {
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [range, setRange] = useState();
  const [guests, setGuests] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const bookedRanges = (venue.bookings ?? []).map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  const nights = range?.from && range?.to ? Math.round((range.to - range.from) / MS_PER_DAY) : 0;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/venues/${venue.id}` } } });
      return;
    }
    if (!range?.from || !range?.to) {
      toast.error('Select your check-in and check-out dates.');
      return;
    }

    setSubmitting(true);
    try {
      await createBooking({
        venueId: venue.id,
        dateFrom: range.from.toISOString(),
        dateTo: range.to.toISOString(),
        guests,
      });
      toast.success('Booking confirmed! Find it under your bookings.');
      navigate('/profile');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-neutral-300 bg-white p-6 shadow-sm"
    >
      <p className="text-neutral-900">
        <span className="text-xl font-semibold">{formatPrice(venue.price)}</span>
        <span className="text-neutral-500"> / night</span>
      </p>

      <div className="mt-4 flex justify-center">
        <DateRangePicker selected={range} onSelect={setRange} disabled={bookedRanges} />
      </div>

      <div className="mt-4">
        <label htmlFor="guests" className="mb-1 block text-sm font-medium text-neutral-900">
          Guests
        </label>
        <input
          id="guests"
          type="number"
          min={1}
          max={venue.maxGuests}
          value={guests}
          onChange={(event) =>
            setGuests(Math.min(venue.maxGuests, Math.max(1, Number(event.target.value))))
          }
          className="h-12 w-full rounded-md border border-neutral-400 bg-white px-4 text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
        />
        <p className="mt-1 text-sm text-neutral-500">Up to {venue.maxGuests} guests.</p>
      </div>

      {nights > 0 && (
        <p className="mt-4 flex items-center justify-between text-neutral-900">
          <span>
            {nights} night{nights > 1 ? 's' : ''}
          </span>
          <span className="font-semibold">{formatPrice(venue.price * nights)}</span>
        </p>
      )}

      <Button type="submit" loading={submitting} className="mt-4 w-full">
        {isAuthenticated ? 'Book now' : 'Log in to book'}
      </Button>
    </form>
  );
}

export { BookingForm };
