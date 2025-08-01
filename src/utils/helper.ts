import {
  format,
  formatDistanceToNow,
  isSameDay,
  isToday,
  isYesterday,
} from "date-fns";

export const getFormattedRangeDate = function (
  range: {
    startDate: Date | null;
    endDate: Date | null;
  },
  fullMonth = false,
) {
  const startDate = range?.startDate;
  const endDate = range?.endDate;

  const isDateExist = endDate && startDate;
  let dateString = "";

  if (isDateExist) {
    const isSameDate = isSameDay(endDate, startDate);
    dateString = isSameDate
      ? `During ${format(startDate, fullMonth ? "MMMM" : "MMM")} ${format(startDate, "d")}`
      : `${format(startDate, fullMonth ? "MMMM" : "MMM")} ${format(startDate, "d")} - ${format(endDate, fullMonth ? "MMMM" : "MMM")} ${format(endDate, "d")}`;
  }

  return dateString;
};

export const getformatDate = function (receivedDate: Date) {
  const date = new Date(receivedDate);

  if (isToday(date)) return formatDistanceToNow(date, { addSuffix: true });
  else if (isYesterday(date)) return `Yesterday at ${format(date, "h:mm a")}`;
  else return `${format(date, "MMMM d, yyyy")} at ${format(date, "h:mm a")}`;
};
