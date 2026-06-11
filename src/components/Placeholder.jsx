/**
 * Temporary section for routes whose full UI lands in a later phase.
 *
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} [props.children] - Optional supporting copy.
 */
function Placeholder({ title, children }) {
  return (
    <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-20">
      <h1 className="font-display text-3xl font-semibold text-primary-900">{title}</h1>
      {children && <p className="mt-3 max-w-prose text-neutral-700">{children}</p>}
    </section>
  );
}

export { Placeholder };
