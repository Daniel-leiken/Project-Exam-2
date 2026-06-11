import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { buttonVariants } from './button-variants';
import { cn } from '@/utils/cn';

/**
 * Button with style-guide variants and sizes. Renders a native `<button>`;
 * set `loading` to show a spinner and disable interaction.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {'primary'|'secondary'|'outline'|'ghost'|'destructive'} [props.variant='primary']
 * @param {'sm'|'default'|'lg'|'icon'} [props.size='default']
 * @param {boolean} [props.loading=false] - Show a spinner and disable the button.
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.children]
 * @param {React.Ref<HTMLButtonElement>} ref
 */
const Button = forwardRef(function Button(
  { className, variant, size, loading = false, disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});

export { Button };
