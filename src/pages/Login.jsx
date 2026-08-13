import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login as loginRequest } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { isStudEmail } from '@/utils/validation';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AuthCard } from '@/components/AuthCard';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';

/**
 * Login page. Validates the credentials client-side, signs the user in, and
 * returns them to the page they were trying to reach (or home).
 */
function Login() {
  useDocumentTitle('Log in');
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  function validate() {
    const next = {};
    if (!isStudEmail(form.email)) next.email = 'Use your stud.noroff.no email address.';
    if (!form.password) next.password = 'Enter your password.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const session = await loginRequest(form);
      login(session);
      toast.success(`Welcome back, ${session.user.name}!`);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Log in"
      subtitle="Welcome back. Sign in to manage your bookings and venues."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary-900 underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
          autoComplete="current-password"
          value={form.password}
          onChange={update('password')}
          error={errors.password}
        />
        <Button type="submit" loading={submitting} className="mt-2">
          Log in
        </Button>
      </form>
    </AuthCard>
  );
}

export default Login;
