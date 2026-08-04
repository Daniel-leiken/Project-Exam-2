import { useCallback, useEffect, useState } from 'react';

/**
 * Run an async query and track its loading / error / data state. Stale requests
 * are ignored, so results always reflect the latest inputs.
 *
 * `queryFn` should be memoized (e.g. with `useCallback`) so the query re-runs
 * only when its inputs actually change.
 *
 * @param {() => Promise<any>} queryFn
 * @returns {{ data: any, error: Error|null, loading: boolean, refetch: () => void }}
 */
export function useApiQuery(queryFn) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const [trackedFn, setTrackedFn] = useState(() => queryFn);
  const [reloadCount, setReloadCount] = useState(0);

  // When the query changes, show loading again (adjust state during render
  // rather than in an effect).
  if (trackedFn !== queryFn) {
    setTrackedFn(() => queryFn);
    setState({ data: null, error: null, loading: true });
  }

  useEffect(() => {
    let active = true;
    queryFn()
      .then((data) => {
        if (active) setState({ data, error: null, loading: false });
      })
      .catch((error) => {
        if (active) setState({ data: null, error, loading: false });
      });
    return () => {
      active = false;
    };
  }, [queryFn, reloadCount]);

  const refetch = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setReloadCount((count) => count + 1);
  }, []);

  return { ...state, refetch };
}
