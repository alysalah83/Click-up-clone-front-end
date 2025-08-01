import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import { WORKSPACE_AVATAR_COLORS } from "../consts/workspace.consts";
import IconPicker from "@/components/common/IconPicker";
import { WorkspaceAvatarColors } from "../types/workspace.types";

interface AvatarColorPickerProps {
  selectedColor: WorkspaceAvatarColors;
  onSelectColor: (color: WorkspaceAvatarColors) => void;
}

interface WorkspaceAvatarProps extends AvatarColorPickerProps {
  avatarLetter: string | undefined;
  disabled?: boolean;
}

function WorkspaceAvatar({
  disabled,
  avatarLetter,
  selectedColor,
  onSelectColor,
}: WorkspaceAvatarProps) {
  const bgColor = WORKSPACE_AVATAR_COLORS[selectedColor].bg;

  return (
    <span>
      <Menu>
        <MenuTrigger>
          <button
            disabled={disabled}
            type="button"
            className={`${bgColor} shrink-0 cursor-pointer rounded-lg border border-neutral-700 px-2 py-1.5 text-lg leading-3.5 font-semibold text-neutral-100 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {avatarLetter?.toUpperCase()}
          </button>
        </MenuTrigger>
        {!disabled && (
          <MenuContent>
            <section className="max-w-56">
              <WorkspaceAvatarMenu
                selectedColor={selectedColor}
                onSelectColor={onSelectColor}
              />
              <IconPicker />
            </section>
          </MenuContent>
        )}
      </Menu>
    </span>
  );
}

function WorkspaceAvatarMenu({
  selectedColor,
  onSelectColor,
}: AvatarColorPickerProps) {
  return (
    <div className="flex flex-col gap-3 px-3 py-2">
      <h3 className="text-xs font-medium text-neutral-400">Space color</h3>
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(WORKSPACE_AVATAR_COLORS).map(([colorKey, styles]) => {
          const color = colorKey as WorkspaceAvatarColors;
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

export default WorkspaceAvatar;
