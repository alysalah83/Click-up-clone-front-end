import { memo } from "react";
import { AVATAR_COLORS, AvatarColors } from "../types/avatarPicker.types";

interface AvatarColorPickerProps {
  selectedColor: AvatarColors;
  onSelectColor: React.Dispatch<React.SetStateAction<AvatarColors>>;
}

function ColorsPicker({
  selectedColor,
  onSelectColor,
}: AvatarColorPickerProps) {
  return (
    <div className="flex flex-col gap-3 px-3 py-2">
      <h3 className="text-xs font-medium text-neutral-400">Space color</h3>
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(AVATAR_COLORS).map(([colorKey, styles]) => {
          const color = colorKey as AvatarColors;
          const { bg: bgColor, ring: ringColor } = styles;
          const isSelected = selectedColor === color;

          return (
            <div
              role="button"
              aria-label={`Select ${color} color`}
              className={`h-5 w-5 ${bgColor} ${
                isSelected
                  ? `cursor-default ${ringColor} ring-2 ring-offset-2 ring-offset-neutral-700`
                  : "cursor-pointer ring-neutral-100/30 ring-offset-neutral-700 hover:ring-2 hover:ring-offset-2"
              } rounded-full transition-all duration-300`}
              onClick={() => onSelectColor(color)}
              key={color}
            />
          );
        })}
      </div>
    </div>
  );
}

export default memo(ColorsPicker);
