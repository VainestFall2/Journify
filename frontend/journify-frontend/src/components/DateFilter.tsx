import { DayPicker } from "react-day-picker";

interface DateFilterProps {
  dateRange: DateRange | undefined;
  onHandleDaySelected: (newSelected: DateRange | undefined) => void;
}

export default function DateFilter({
  dateRange,
  onHandleDaySelected,
}: DateFilterProps) {
  return (
    <aside className="w-[320px]">
      <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg p-3">
        <DayPicker
          required
          captionLayout="dropdown-years"
          mode="range"
          selected={dateRange}
          onSelect={onHandleDaySelected}
          pagedNavigation
        />
      </div>
    </aside>
  );
}
