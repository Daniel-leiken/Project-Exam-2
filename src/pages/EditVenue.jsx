import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getVenue, updateVenue } from '@/api/venues';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useApiQuery } from '@/hooks/useApiQuery';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { VenueForm } from '@/components/venue/VenueForm';
import { Spinner } from '@/components/ui/Spinner';
import { buttonVariants } from '@/components/ui/button-variants';

/** Page for editing a venue you manage (venue managers only). */
function EditVenue() {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const queryFn = useCallback(() => getVenue(id), [id]);
  const { data, loading, error } = useApiQuery(queryFn);
  useDocumentTitle('Edit venue');

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await updateVenue(id, payload);
      toast.success('Venue updated.');
      navigate(`/venues/${id}`);
    } catch (requestError) {
      toast.error(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" label="Loading venue…" />
      </div>
    );
  }

  const venue = data?.data;

  if (error || !venue || venue.owner?.name !== user.name) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center">
        <p role="alert" className="text-danger">
          {error ? error.message : 'You can only edit venues you manage.'}
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

  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <Link
        to="/manager"
        className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold text-primary-900">Edit venue</h1>
      <div className="mt-8">
        <VenueForm
          initialVenue={venue}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Save changes"
        />
      </div>
    </section>
  );
}

export default EditVenue;
