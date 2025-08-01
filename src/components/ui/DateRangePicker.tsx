import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { useMenu } from "@/components/ui/MenuCompound";
import Button from "@/components/common/Button";
import { DateRange } from "react-date-range";

interface DateRanges {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  dateRanges: DateRanges;
  onDateChange: (dateRang: DateRanges) => void;
}

function DateRangePicker({ onDateChange, dateRanges }: DateRangePickerProps) {
  const [date, setDate] = useState([
    {
      startDate: dateRanges.startDate,
      endDate: dateRanges.endDate,
      key: "selection",
    },
  ]);
  const { toggleMenu } = useMenu();

  const handleConfirm = function () {
    onDateChange({
      startDate: date[0].startDate,
      endDate: date[0].endDate,
    });
    toggleMenu();
  };

  return (
    <div className="flex flex-col">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {
          const { startDate, endDate, key } = item.selection;
          setDate([
            {
              startDate: startDate || new Date(),
              endDate: endDate || new Date(),
              key: key || "selection",
            },
          ]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={date}
        rangeColors={["#525252"]}
      />
      <div className="flex gap-2 rounded-b-xl border-t border-neutral-400 bg-neutral-800 px-4 py-4">
        <Button
          size="large"
          ariaLabel="clear task date"
          stretch={true}
          onClick={toggleMenu}
          type="secondary"
        >
          Clear
        </Button>
        <Button
          size="large"
          ariaLabel="confirm task date"
          stretch={true}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
export default DateRangePicker;
