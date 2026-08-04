import { Link } from 'react-router-dom';
import { ImageOff, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatPrice } from '@/utils/format';

/**
 * Summary card linking to a venue's detail page: cover image, name, location,
 * rating and nightly price.
 *
 * @param {{ venue: object }} props
 */
function VenueCard({ venue }) {
  const image = venue.media?.[0];
  const place = [venue.location?.city, venue.location?.country].filter(Boolean).join(', ');

  return (
    <Link
      to={`/venues/${venue.id}`}
      className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
    >
      <Card className="h-full transition-shadow group-hover:shadow-lg">
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
          {image ? (
            <img
              src={image.url}
              alt={image.alt || venue.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              <ImageOff className="h-8 w-8" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold text-neutral-900">{venue.name}</h3>
            {venue.rating > 0 && (
              <span className="flex shrink-0 items-center gap-1 text-sm text-neutral-700">
                <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                {venue.rating.toFixed(1)}
              </span>
            )}
          </div>

          {place && (
            <p className="mt-1 flex items-center gap-1 text-sm text-neutral-500">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">{place}</span>
            </p>
          )}

          <p className="mt-3 text-neutral-900">
            <span className="font-semibold">{formatPrice(venue.price)}</span>
            <span className="text-neutral-500"> / night</span>
          </p>
        </div>
      </Card>
    </Link>
  );
}

export { VenueCard };
