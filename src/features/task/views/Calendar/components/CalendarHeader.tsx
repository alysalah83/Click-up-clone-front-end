"use client";

import ButtonIcon from "@/shared/ui/Button/ButtonIcon";
import { MONTH_NAMES } from "../calendar.consts";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  const monthName = MONTH_NAMES[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className="flex w-full items-center justify-center gap-2 border-b border-neutral-300 px-4 py-3 dark:border-neutral-700">
      <ButtonIcon
        icon="leftArrow2"
        ariaLabel="Previous month"
        onClick={onPrevMonth}
        withBg
        padding="small"
        size={4}
      />
      <h2 className="min-w-[160px] text-center text-base font-semibold text-neutral-800 dark:text-neutral-100">
        {monthName} {year}
      </h2>
      <ButtonIcon
        icon="rightArrow2"
        ariaLabel="Next month"
        onClick={onNextMonth}
        withBg
        padding="small"
        size={4}
      />
    </div>
  );
}

export default CalendarHeader;
