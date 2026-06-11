import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal dialog rendered in a portal. Traps focus while open, closes
 * on Escape or backdrop click, locks body scroll, and restores focus to the
 * previously focused element on close.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} [props.title] - Used as the accessible dialog label.
 * @param {React.ReactNode} [props.children]
 * @param {React.ReactNode} [props.footer] - Right-aligned action row.
 * @param {string} [props.className]
 */
function Modal({ open, onClose, title, children, footer, className }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog once it has mounted.
    const focusables = dialogRef.current?.querySelectorAll(FOCUSABLE);
    (focusables?.[0] ?? dialogRef.current)?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Keep focus inside the dialog while it is open.
      const items = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused instanceof HTMLElement && previouslyFocused.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn(
          'relative w-full max-w-md rounded-xl bg-white p-8 shadow-lg outline-none',
          className
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-sm p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {title && (
          <h2 id={titleId} className="mb-4 pr-8 text-xl font-semibold text-neutral-900">
            {title}
          </h2>
        )}

        {children}

        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export { Modal };
