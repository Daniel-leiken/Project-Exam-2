import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(function Input({ className, invalid = false, ...props }, ref) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'h-12 w-full rounded-md border bg-white px-4 text-neutral-900 placeholder:text-neutral-500',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        invalid
          ? 'border-danger focus-visible:ring-danger'
          : 'border-neutral-400 focus-visible:ring-primary-700',
        'disabled:cursor-not-allowed disabled:bg-neutral-100',
        className
      )}
      {...props}
    />
  );
});

export { Input };
