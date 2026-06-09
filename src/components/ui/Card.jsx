import { cn } from '@/utils/cn';

function Card({ className, ...props }) {
  return (
    <div
      className={cn('overflow-hidden rounded-md bg-white shadow-sm', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn('px-4 pt-4', className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={cn('p-4', className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center px-4 pb-4', className)} {...props} />;
}

export { Card, CardHeader, CardContent, CardFooter };
