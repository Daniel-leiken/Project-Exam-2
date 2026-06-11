/**
 * Centered shell for the login and register forms: a title, optional subtitle,
 * the form content, and an optional footer (e.g. a link to the other page).
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer]
 */
function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="mx-auto w-full max-w-md px-5 py-16">
      <h1 className="font-display text-3xl font-semibold text-primary-900">{title}</h1>
      {subtitle && <p className="mt-2 text-neutral-700">{subtitle}</p>}
      <div className="mt-8">{children}</div>
      {footer && <div className="mt-6 text-sm text-neutral-700">{footer}</div>}
    </section>
  );
}

export { AuthCard };
