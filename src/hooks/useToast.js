import { useContext } from 'react';
import { ToastContext } from '@/context/toast-context';

/**
 * Access the toast API.
 *
 * @returns {{ success: Function, error: Function, info: Function, dismiss: Function }}
 * @throws {Error} If used outside a {@link ToastProvider}.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
