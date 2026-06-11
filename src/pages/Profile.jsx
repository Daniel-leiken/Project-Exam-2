import { useState } from 'react';
import { updateAvatar } from '@/api/profiles';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { isValidUrl } from '@/utils/validation';
import { Card, CardContent } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

function Profile() {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url ?? '');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

      <Card className="mt-8 max-w-md">
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

      <p className="mt-8 text-neutral-500">Your upcoming bookings will appear here in phase 4.</p>
    </section>
  );
}

export default Profile;
