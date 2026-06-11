import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginRequest, register as registerRequest } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { isStudEmail, isValidUrl, isValidUsername } from '@/utils/validation';
import { AuthCard } from '@/components/AuthCard';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

const initialForm = {
  name: '',
  email: '',
  password: '',
  avatarUrl: '',
  venueManager: false,
};

/**
 * Registration page for customers and venue managers. Validates input against
 * the Noroff rules (stud.noroff.no email, username, password length), creates
 * the account, then logs the user straight in.
 */
function Register() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  function validate() {
    const next = {};
    if (!isValidUsername(form.name)) {
      next.name = 'Use only letters, numbers and underscores.';
    }
    if (!isStudEmail(form.email)) {
      next.email = 'Use your stud.noroff.no email address.';
    }
    if (form.password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (form.avatarUrl && !isValidUrl(form.avatarUrl)) {
      next.avatarUrl = 'Enter a valid image URL, or leave this blank.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await registerRequest(form);
      const session = await loginRequest({ email: form.email, password: form.password });
      login(session);
      toast.success(`Welcome to Holidaze, ${session.user.name}!`);
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create an account"
      subtitle="Register with your stud.noroff.no email to book stays or manage venues."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-900 underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          label="Username"
          autoComplete="username"
          value={form.name}
          onChange={update('name')}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          error={errors.email}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
          hint="At least 8 characters."
        />
        <FormField
          label="Avatar URL (optional)"
          type="url"
          value={form.avatarUrl}
          onChange={update('avatarUrl')}
          error={errors.avatarUrl}
          placeholder="https://…"
        />

        <label className="flex items-start gap-3 text-sm text-neutral-900">
          <input
            type="checkbox"
            checked={form.venueManager}
            onChange={(event) =>
              setForm((current) => ({ ...current, venueManager: event.target.checked }))
            }
            className="mt-0.5 h-4 w-4 rounded border-neutral-400 accent-primary-900"
          />
          <span>
            Register as a venue manager
            <span className="block text-neutral-500">
              You&apos;ll be able to create and manage your own venues.
            </span>
          </span>
        </label>

        <Button type="submit" loading={submitting} className="mt-2">
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}

export default Register;
