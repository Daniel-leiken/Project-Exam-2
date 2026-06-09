import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { buttonVariants } from './button-variants';
import { cn } from '@/utils/cn';

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
