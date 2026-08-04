import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createVenue } from '@/api/venues';
import { useToast } from '@/hooks/useToast';
import { VenueForm } from '@/components/venue/VenueForm';

/** Page for creating a new venue (venue managers only). */
function CreateVenue() {
  const navigate = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      const { data } = await createVenue(payload);
      toast.success('Venue created.');
      navigate(`/venues/${data.id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-12">
      <Link
        to="/manager"
        className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to dashboard
      </Link>
      <h1 className="mt-4 font-display text-3xl font-semibold text-primary-900">Create a venue</h1>
      <div className="mt-8">
        <VenueForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Create venue" />
      </div>
    </section>
  );
}

export default CreateVenue;
