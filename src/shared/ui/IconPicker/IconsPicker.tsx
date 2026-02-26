import { useEffect, useMemo, useRef, useState, memo } from "react";
import MiniSpinner from "@/shared/ui/MiniSpinner";

import { IconType } from "react-icons";
import { ICON_PICKER_LOAD_COUNT, ICONS_REGISTRY } from "./IconRegistry";
import { IconsRegistry } from "./types";

const iconPickerLoadCount = ICON_PICKER_LOAD_COUNT || 50;

const IconButton = memo(function IconButton({
  iconName,
  Icon,
  isSelected,
  setSelectedIcon,
}: {
  iconName: IconsRegistry;
  Icon: IconType;
  isSelected: boolean;
  setSelectedIcon: (icon: IconsRegistry) => void;
}) {
  return (
    <button
      className={`cursor-pointer rounded-lg p-1 transition duration-300 ${isSelected ? "bg-neutral-900/10 dark:bg-neutral-200/10" : "hover:bg-neutral-900/10 active:bg-neutral-900/10 dark:hover:bg-neutral-200/10 dark:active:bg-neutral-200/10"}`}
      aria-label={`${iconName} Avatar`}
      type="button"
      onClick={() => (isSelected ? null : setSelectedIcon(iconName))}
    >
      <Icon className="size-6 fill-neutral-600 text-neutral-600 dark:fill-neutral-400 dark:text-neutral-400" />
    </button>
  );
});

function IconPicker({
  selectedIcon,
  setSelectedIcon,
}: {
  selectedIcon: IconsRegistry | null;
  setSelectedIcon: (icon: IconsRegistry) => void;
}) {
  const [iconsVisibleCount, setIconsVisibleCount] =
    useState(iconPickerLoadCount);
  const iconPickerContainerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const iconsArr = useMemo(
    () => Object.entries(ICONS_REGISTRY) as [IconsRegistry, IconType][],
    [],
  );
  const iconsCount = useMemo(() => iconsArr.length, [iconsArr]);

  const visibleIcons = useMemo(
    () => iconsArr.slice(0, iconsVisibleCount),
    [iconsArr, iconsVisibleCount],
  );

  useEffect(() => {
    const handleLoadIcons = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry?.isIntersecting)
        setIconsVisibleCount((cur) =>
          Math.min(cur + iconPickerLoadCount, iconsCount),
        );
    };

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
  }, [iconsCount]);

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
            setSelectedIcon={setSelectedIcon}
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
