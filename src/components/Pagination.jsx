import { Button } from '@/components/ui/Button';

/**
 * Previous/next pagination control. Renders nothing when there is a single page.
 *
 * @param {object} props
 * @param {number} props.page - Current page (1-based).
 * @param {number} props.pageCount - Total number of pages.
 * @param {(page: number) => void} props.onPageChange
 */
function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">
      <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <span className="text-sm text-neutral-700" aria-live="polite">
        Page {page} of {pageCount}
      </span>
      <Button variant="outline" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </nav>
  );
}

export { Pagination };
