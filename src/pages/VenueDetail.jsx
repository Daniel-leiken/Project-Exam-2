import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Car, Coffee, MapPin, PawPrint, Star, Users, Wifi } from 'lucide-react';
import { getVenue } from '@/api/venues';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { BookingForm } from '@/components/venue/BookingForm';
import { Spinner } from '@/components/ui/Spinner';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { buttonVariants } from '@/components/ui/button-variants';

const AMENITIES = [
  { key: 'wifi', label: 'WiFi', icon: Wifi },
  { key: 'parking', label: 'Parking', icon: Car },
  { key: 'breakfast', label: 'Breakfast', icon: Coffee },
  { key: 'pets', label: 'Pets allowed', icon: PawPrint },
];

/**
 * Single venue page (by id): media, description, amenities, host, and the
 * booking widget with an availability calendar.
 */
function VenueDetail() {
  const { id } = useParams();
  const queryFn = useCallback(() => getVenue(id), [id]);
  const { data, loading, error } = useApiQuery(queryFn);
  useDocumentTitle(data?.data?.name?.trim() || 'Venue');

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" label="Loading venue…" />
      </div>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-screen-xl px-5 py-20 text-center lg:px-20">
        <p role="alert" className="text-danger">
          Couldn&apos;t load this venue. {error.message}
        </p>
        <Link to="/venues" className={`mt-6 inline-flex ${buttonVariants({ variant: 'outline' })}`}>
          Back to venues
        </Link>
      </section>
    );
  }

  const venue = data.data;
  const image = venue.media?.[0];
  const place = [venue.location?.city, venue.location?.country].filter(Boolean).join(', ');
  const activeAmenities = AMENITIES.filter((amenity) => venue.meta?.[amenity.key]);

  return (
    <article className="mx-auto max-w-screen-xl px-5 py-8 lg:px-20">
      <Link
        to="/venues"
        className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to venues
      </Link>

      <ImageWithFallback
        src={image?.url}
        alt={image?.alt || venue.name?.trim() || 'Venue'}
        className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-lg"
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="font-display text-3xl font-semibold text-primary-900">
            {venue.name?.trim() || 'Untitled venue'}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-neutral-700">
            {place && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {place}
              </span>
            )}
            {venue.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                {venue.rating.toFixed(1)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" aria-hidden="true" />
              Up to {venue.maxGuests} guests
            </span>
          </div>

          {venue.description && (
            <p className="mt-6 whitespace-pre-line text-neutral-700">{venue.description}</p>
          )}

          {activeAmenities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-neutral-900">Amenities</h2>
              <ul className="mt-3 flex flex-wrap gap-3">
                {activeAmenities.map(({ key, label, icon: Icon }) => (
                  <li
                    key={key}
                    className="flex items-center gap-2 rounded-sm bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {venue.owner && (
            <div className="mt-8 flex items-center gap-3">
              {venue.owner.avatar?.url && (
                <img
                  src={venue.owner.avatar.url}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <p className="text-sm text-neutral-700">
                Hosted by <span className="font-medium text-neutral-900">{venue.owner.name}</span>
              </p>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingForm venue={venue} />
        </aside>
      </div>
    </article>
  );
}

export default VenueDetail;
