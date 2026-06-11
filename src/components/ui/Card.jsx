import { cn } from '@/utils/cn';

/**
 * Card surface: white background, rounded corners and a soft shadow.
 * Compose with {@link CardHeader}, {@link CardContent} and {@link CardFooter}.
 * @param {{ className?: string }} props
 */
function Card({ className, ...props }) {
  return (
    <div className={cn('overflow-hidden rounded-md bg-white shadow-sm', className)} {...props} />
  );
}

/**
 * Card header region (padded, no bottom padding so it sits above content).
 * @param {{ className?: string }} props
 */
function CardHeader({ className, ...props }) {
  return <div className={cn('px-4 pt-4', className)} {...props} />;
}

/**
 * Padded card body.
 * @param {{ className?: string }} props
 */
function CardContent({ className, ...props }) {
  return <div className={cn('p-4', className)} {...props} />;
}

/**
 * Card footer row.
 * @param {{ className?: string }} props
 */
function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center px-4 pb-4', className)} {...props} />;
}

export { Card, CardHeader, CardContent, CardFooter };
