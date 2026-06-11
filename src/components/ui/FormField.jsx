import { useId } from 'react';
import { Input } from './Input';

/**
 * Labelled text input with accessible error wiring: the label is tied to the
 * input, and the error (or hint) is linked via `aria-describedby` while
 * `aria-invalid` flags the error state. Forwards all other props to {@link Input}.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.error] - Error message; also switches the field to its invalid style.
 * @param {string} [props.hint] - Helper text shown when there is no error.
 * @param {string} [props.type='text']
 */
function FormField({ label, error, hint, type = 'text', ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-900">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-1 text-sm text-neutral-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export { FormField };
