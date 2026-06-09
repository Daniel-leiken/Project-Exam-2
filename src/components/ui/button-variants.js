import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-900 text-white hover:bg-primary-700',
        secondary: 'bg-white text-neutral-900 shadow-sm hover:bg-neutral-100',
        outline: 'border border-neutral-400 text-neutral-900 hover:bg-neutral-100',
        ghost: 'text-neutral-900 hover:bg-neutral-100',
        destructive: 'bg-danger text-white hover:bg-[#991B1B]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        default: 'h-9 px-4',
        lg: 'h-10 px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);
