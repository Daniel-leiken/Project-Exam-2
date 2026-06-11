import { createContext } from 'react';

/**
 * Toast context. Value: `{ success, error, info, dismiss }`.
 * Consume it via the {@link useToast} hook rather than directly.
 * @type {React.Context<object|null>}
 */
export const ToastContext = createContext(null);
