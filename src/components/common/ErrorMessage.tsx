import { ICONS_MAP } from "@/constants/iconsMap";
import { StylesSizes } from "@/types/index.types";

interface ErrorMessageProps {
  error: string | undefined;
  size?: StylesSizes;
}

function ErrorMessage({ error, size = "medium" }: ErrorMessageProps) {
  const textSize = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };
  return (
    <div className="flex items-center gap-0.5">
      <ICONS_MAP.error
        className={`${textSize[size]} size-4 fill-red-500 font-medium text-red-500`}
      />
      <span className={`${textSize[size]} font-medium text-red-500`}>
        {error}
      </span>
    </div>
  );
}

export default ErrorMessage;
