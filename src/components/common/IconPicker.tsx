import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import * as icons from "react-icons/io";
import MiniSpinner from "../ui/MiniSpinner";
import { ICON_PICKER_LOAD_COUNT } from "@/config/config";

const iconPickerLoadCount = ICON_PICKER_LOAD_COUNT || 50;

const IconButton = memo(function IconButton({
  iconName,
  Icon,
}: {
  iconName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
}) {
  return (
    <button
      className="cursor-pointer rounded-lg p-1 transition duration-300 hover:bg-neutral-200/10 active:bg-neutral-200/10"
      aria-label={`${iconName} Avatar`}
      type="button"
    >
      <Icon className="size-5 fill-neutral-400 text-neutral-400" />
    </button>
  );
});

function IconPicker() {
  const [iconsVisibleCount, setIconsVisibleCount] =
    useState(iconPickerLoadCount);
  const iconPickerContainerRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const iconsArr = useMemo(() => Object.entries(icons), []);
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
          <IconButton key={iconName} iconName={iconName} Icon={Icon} />
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

export default IconPicker;
