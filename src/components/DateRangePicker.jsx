import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { cn } from '@/utils/cn';

// Theme react-day-picker to the Holidaze teal palette via its CSS variables.
const themeStyle = {
  '--rdp-accent-color': '#0B3B3C',
  '--rdp-accent-background-color': '#CCFBF1',
  '--rdp-day_button-border-radius': '0.5rem',
};

/**
 * Booking calendar for selecting a check-in / check-out range.
 *
 * @param {object} props
 * @param {import('react-day-picker').DateRange} [props.selected] - The selected range.
 * @param {(range: import('react-day-picker').DateRange|undefined) => void} props.onSelect
 * @param {Array<object>} [props.disabled=[]] - Already-booked dates/ranges to block.
 * @param {boolean} [props.disablePast=true] - Also block dates before today.
 * @param {number} [props.numberOfMonths=1] - Months to display side by side.
 * @param {string} [props.className]
 */
function DateRangePicker({
  selected,
  onSelect,
  disabled = [],
  disablePast = true,
  numberOfMonths = 1,
  className,
}) {
  const disabledMatchers = disablePast ? [{ before: new Date() }, ...disabled] : disabled;

  return (
    <DayPicker
      mode="range"
      selected={selected}
      onSelect={onSelect}
      disabled={disabledMatchers}
      numberOfMonths={numberOfMonths}
      style={themeStyle}
      className={cn(className)}
    />
  );
}

export { DateRangePicker };
