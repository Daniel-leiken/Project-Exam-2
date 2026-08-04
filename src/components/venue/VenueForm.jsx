import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { isValidUrl } from '@/utils/validation';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const AMENITIES = [
  { key: 'wifi', label: 'WiFi' },
  { key: 'parking', label: 'Parking' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'pets', label: 'Pets allowed' },
];

const createMediaRow = (url = '') => ({ id: crypto.randomUUID(), url });

/** Map an existing venue (or nothing) into editable form state. */
function buildInitialForm(venue) {
  return {
    name: venue?.name ?? '',
    description: venue?.description ?? '',
    price: venue?.price != null ? String(venue.price) : '',
    maxGuests: venue?.maxGuests != null ? String(venue.maxGuests) : '',
    rating: venue?.rating ? String(venue.rating) : '',
    media: venue?.media?.length
      ? venue.media.map((item) => createMediaRow(item.url))
      : [createMediaRow()],
    meta: {
      wifi: Boolean(venue?.meta?.wifi),
      parking: Boolean(venue?.meta?.parking),
      breakfast: Boolean(venue?.meta?.breakfast),
      pets: Boolean(venue?.meta?.pets),
    },
    location: {
      address: venue?.location?.address ?? '',
      city: venue?.location?.city ?? '',
      zip: venue?.location?.zip ?? '',
      country: venue?.location?.country ?? '',
    },
  };
}

/** Convert form state into the API payload (numbers, media objects, trimmed strings). */
function buildPayload(form) {
  const media = form.media
    .map((item) => item.url.trim())
    .filter(Boolean)
    .map((url) => ({ url, alt: form.name.trim() || 'Venue image' }));

  return {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    maxGuests: Number(form.maxGuests),
    rating: form.rating ? Number(form.rating) : 0,
    media,
    meta: form.meta,
    location: {
      address: form.location.address.trim() || null,
      city: form.location.city.trim() || null,
      zip: form.location.zip.trim() || null,
      country: form.location.country.trim() || null,
    },
  };
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';

  const price = Number(form.price);
  if (form.price === '' || Number.isNaN(price) || price < 0) {
    errors.price = 'Enter a valid price.';
  }

  const guests = Number(form.maxGuests);
  if (form.maxGuests === '' || !Number.isInteger(guests) || guests < 1) {
    errors.maxGuests = 'Enter at least 1 guest.';
  }

  if (form.rating) {
    const rating = Number(form.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = 'Rating must be between 0 and 5.';
    }
  }

  form.media.forEach((item) => {
    if (item.url.trim() && !isValidUrl(item.url.trim())) {
      errors[`media-${item.id}`] = 'Enter a valid URL.';
    }
  });

  return errors;
}

/**
 * Reusable create/edit form for a venue. Handles its own field state and
 * validation, then hands the built payload to `onSubmit`.
 *
 * @param {object} props
 * @param {object} [props.initialVenue] - Existing venue to edit; omit to create.
 * @param {(payload: object) => void} props.onSubmit
 * @param {boolean} [props.submitting=false]
 * @param {string} [props.submitLabel='Save venue']
 */
function VenueForm({ initialVenue, onSubmit, submitting = false, submitLabel = 'Save venue' }) {
  const [form, setForm] = useState(() => buildInitialForm(initialVenue));
  const [errors, setErrors] = useState({});

  const setField = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const setLocation = (field) => (event) =>
    setForm((current) => ({
      ...current,
      location: { ...current.location, [field]: event.target.value },
    }));

  const toggleMeta = (key) => (event) =>
    setForm((current) => ({ ...current, meta: { ...current.meta, [key]: event.target.checked } }));

  const setMediaUrl = (id) => (event) =>
    setForm((current) => ({
      ...current,
      media: current.media.map((item) =>
        item.id === id ? { ...item, url: event.target.value } : item
      ),
    }));

  const addMedia = () =>
    setForm((current) => ({ ...current, media: [...current.media, createMediaRow()] }));

  const removeMedia = (id) =>
    setForm((current) => ({ ...current, media: current.media.filter((item) => item.id !== id) }));

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(buildPayload(form));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <FormField label="Name" value={form.name} onChange={setField('name')} error={errors.name} />

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-neutral-900">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={setField('description')}
          className="w-full rounded-md border border-neutral-400 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Price per night (NOK)"
          type="number"
          min={0}
          value={form.price}
          onChange={setField('price')}
          error={errors.price}
        />
        <FormField
          label="Max guests"
          type="number"
          min={1}
          value={form.maxGuests}
          onChange={setField('maxGuests')}
          error={errors.maxGuests}
        />
      </div>

      <FormField
        label="Rating (0–5, optional)"
        type="number"
        min={0}
        max={5}
        step={0.1}
        value={form.rating}
        onChange={setField('rating')}
        error={errors.rating}
      />

      <fieldset>
        <legend className="text-sm font-medium text-neutral-900">Images</legend>
        <div className="mt-2 flex flex-col gap-3">
          {form.media.map((item, index) => (
            <div key={item.id} className="flex items-start gap-2">
              <div className="flex-1">
                <Input
                  type="url"
                  value={item.url}
                  onChange={setMediaUrl(item.id)}
                  placeholder="https://…"
                  aria-label={`Image URL ${index + 1}`}
                  invalid={Boolean(errors[`media-${item.id}`])}
                />
                {errors[`media-${item.id}`] && (
                  <p className="mt-1 text-sm text-danger">{errors[`media-${item.id}`]}</p>
                )}
              </div>
              {form.media.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={`Remove image ${index + 1}`}
                  onClick={() => removeMedia(item.id)}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={addMedia}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add image
        </Button>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-neutral-900">Amenities</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {AMENITIES.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-neutral-900">
              <input
                type="checkbox"
                checked={form.meta[key]}
                onChange={toggleMeta(key)}
                className="h-4 w-4 rounded border-neutral-400 accent-primary-900"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-neutral-900">Location</legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <FormField
            label="Address"
            value={form.location.address}
            onChange={setLocation('address')}
          />
          <FormField label="City" value={form.location.city} onChange={setLocation('city')} />
          <FormField label="Zip" value={form.location.zip} onChange={setLocation('zip')} />
          <FormField
            label="Country"
            value={form.location.country}
            onChange={setLocation('country')}
          />
        </div>
      </fieldset>

      <Button type="submit" loading={submitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

export { VenueForm };
