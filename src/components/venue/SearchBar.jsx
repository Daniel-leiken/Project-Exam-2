import { Search } from 'lucide-react';

/**
 * Rounded search field with a leading icon. Controlled by the parent.
 *
 * @param {object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.placeholder='Search venues…']
 */
function SearchBar({ value, onChange, placeholder = 'Search venues…' }) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search venues"
        className="h-12 w-full rounded-full border border-neutral-400 bg-white pl-12 pr-4 text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
      />
    </div>
  );
}

export { SearchBar };
