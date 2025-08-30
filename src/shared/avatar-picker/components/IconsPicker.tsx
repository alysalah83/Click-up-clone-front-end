import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import { ICON_PICKER_LOAD_COUNT } from "@/config/config";
import MiniSpinner from "@/components/ui/MiniSpinner";
import { AVATAR_ICONS as icons } from "../consts/avatar.consts";
import { AvatarIcons } from "../types/avatarPicker.types";
import { IconType } from "react-icons";

const iconPickerLoadCount = ICON_PICKER_LOAD_COUNT || 50;

const IconButton = memo(function IconButton({
  iconName,
  Icon,
  isSelected,
  onSelectIcon,
}: {
  iconName: AvatarIcons;
  Icon: IconType;
  isSelected: boolean;
  onSelectIcon: (icon: AvatarIcons) => void;
}) {
  return (
    <button
      className={`cursor-pointer rounded-lg p-1 transition duration-300 ${isSelected ? "bg-neutral-900/10 dark:bg-neutral-200/10" : "hover:bg-neutral-900/10 active:bg-neutral-900/10 dark:hover:bg-neutral-200/10 dark:active:bg-neutral-200/10"}`}
      aria-label={`${iconName} Avatar`}
      type="button"
      onClick={() => (isSelected ? null : onSelectIcon(iconName))}
    >
      <Icon className="size-6 fill-neutral-600 text-neutral-600 dark:fill-neutral-400 dark:text-neutral-400" />
    </button>
  );
});

function IconPicker({
  selectedIcon,
  onSelectIcon,
}: {
  selectedIcon: AvatarIcons | null;
  onSelectIcon: (icon: AvatarIcons) => void;
}) {
  const [iconsVisibleCount, setIconsVisibleCount] =
    useState(iconPickerLoadCount);
  const iconPickerContainerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const iconsArr = useMemo(
    () => Object.entries(icons) as [AvatarIcons, IconType][],
    [],
  );
  const iconsCount = iconsArr.length;

  const visibleIcons = useMemo(
    () => iconsArr.slice(0, iconsVisibleCount),
    [iconsArr, iconsVisibleCount],
  );

  const handleLoadIcons = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting)
        setIconsVisibleCount((cur) =>
          Math.min(cur + iconPickerLoadCount, iconsCount),
        );
    },
    [iconsCount],
  );

  useEffect(() => {
    const options = {
      root: iconPickerContainerRef.current,
      rootMargin: "50px 0px 0px 0px",
    };

    const observer = new IntersectionObserver(handleLoadIcons, options);
    const loaderElem = loaderRef.current;

    if (loaderElem) observer.observe(loaderElem);

    return () => {
      if (loaderElem) observer.unobserve(loaderElem);
    };
  }, [handleLoadIcons]);

  return (
    <div
      className="flex max-h-44 w-fit flex-col items-center gap-2 overflow-y-auto px-3 py-2"
      ref={iconPickerContainerRef}
    >
      <div className="flex flex-wrap gap-1">
        {visibleIcons.map(([iconName, Icon]) => (
          <IconButton
            key={iconName}
            iconName={iconName}
            Icon={Icon}
            isSelected={selectedIcon === iconName}
            onSelectIcon={onSelectIcon}
          />
        ))}
      </div>
      {iconsCount !== iconsVisibleCount && (
        <div ref={loaderRef}>
          <MiniSpinner />
        </div>
      )}
    </div>
  );
}

export default memo(IconPicker);
