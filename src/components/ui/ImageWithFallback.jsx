import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Image with a loading skeleton and graceful fallback. A pulsing placeholder
 * shows until the image loads; the image then fades in. If there is no source
 * or it fails to load, a fallback icon is shown instead.
 *
 * @param {object} props
 * @param {string} [props.src]
 * @param {string} props.alt
 * @param {string} [props.className] - Classes for the wrapper (size, radius, aspect).
 * @param {string} [props.imgClassName] - Extra classes for the image (e.g. hover effects).
 */
function ImageWithFallback({ src, alt, className, imgClassName }) {
  const [status, setStatus] = useState(src ? 'loading' : 'error');

  return (
    <div className={cn('relative bg-neutral-100', className)}>
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition duration-300',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
        />
      )}

      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-neutral-200" aria-hidden="true" />
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
          <ImageOff className="h-8 w-8" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export { ImageWithFallback };
