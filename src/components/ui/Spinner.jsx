import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

function Spinner({ size = 'md', className, label = 'Loading…' }) {
  return (
    <span role="status" className={cn('inline-flex text-primary-700', className)}>
      <Loader2 className={cn('animate-spin', sizes[size])} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner };
