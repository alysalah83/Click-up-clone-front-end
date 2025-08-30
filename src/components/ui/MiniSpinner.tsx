import { StylesSizes } from "@/types/index.types";

interface MiniSpinnerProps {
  width?: StylesSizes;
  padding?: string;
  bgColor?: string;
}

function MiniSpinner({
  width = "small",
  padding = "p-1",
  bgColor = "bg-neutral-900 dark:bg-neutral-200",
}: MiniSpinnerProps) {
  const spinnerWidthClass = {
    small: "w-5",
    medium: "w-6",
    large: "w-9",
  };

  return (
    <div className={spinnerWidthClass[width]}>
      <span className={`loader block w-full ${padding} ${bgColor}`} />
    </div>
  );
}

export default MiniSpinner;
