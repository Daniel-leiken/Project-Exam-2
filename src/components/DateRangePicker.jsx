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
 * Pass already-booked dates via `disabled` (date-fns ranges or matchers).
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
