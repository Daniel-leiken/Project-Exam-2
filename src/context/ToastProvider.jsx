import { useCallback, useMemo, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { ToastContext } from './toast-context';
import { cn } from '@/utils/cn';

/** Border accent and icon per toast variant. */
const variants = {
  success: { border: 'border-l-success', icon: CheckCircle2, color: 'text-success' },
  error: { border: 'border-l-danger', icon: XCircle, color: 'text-danger' },
  info: { border: 'border-l-primary-700', icon: Info, color: 'text-primary-700' },
};

let nextId = 0;

/**
 * Provides the toast API (`success`, `error`, `info`, `dismiss`) and renders the
 * toast viewport. Errors use `role="alert"`; others use `role="status"`.
 * Consume it via the {@link useToast} hook.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * Remove a toast.
   * @param {number} id
   */
  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Queue a toast and schedule its auto-dismissal.
   * @param {string} message
   * @param {'success'|'error'|'info'} variant
   * @param {number} [duration=4000] - Auto-dismiss delay in ms; `0` keeps it until dismissed.
   * @returns {number} The new toast's id.
   */
  const push = useCallback(
    (message, variant, duration = 4000) => {
      const id = ++nextId;
      setToasts((current) => [...current, { id, message, variant }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      success: (message, options) => push(message, 'success', options?.duration),
      error: (message, options) => push(message, 'error', options?.duration),
      info: (message, options) => push(message, 'info', options?.duration),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map(({ id, message, variant }) => {
          const { border, icon: Icon, color } = variants[variant] ?? variants.info;
          return (
            <div
              key={id}
              role={variant === 'error' ? 'alert' : 'status'}
              className={cn(
                'flex items-start gap-3 rounded-md border-l-4 bg-white p-4 shadow-lg',
                border
              )}
            >
              <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', color)} aria-hidden="true" />
              <p className="flex-1 text-sm text-neutral-900">{message}</p>
              <button
                type="button"
                onClick={() => dismiss(id)}
                aria-label="Dismiss notification"
                className="text-neutral-500 hover:text-neutral-900"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
