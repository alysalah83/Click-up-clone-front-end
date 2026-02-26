"use client";

import ButtonIcon from "@/shared/ui/Button/ButtonIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTaskSortsStore } from "../stores/useTaskSortsStore";

type SortingFor = "status" | "dueDate" | "priority" | "createdAt";
type SortType = "asc" | "desc" | "";
type UsedFor = "table" | "board" | "list";

function TaskSortButton({
  sortingFor,
  withLabel,
  usedFor = "table",
}: {
  sortingFor: SortingFor;
  withLabel?: boolean;
  usedFor?: UsedFor;
}) {
  const {
    tableSorts,
    boardSorts,
    listSorts,
    setTableSorts,
    setBoardSorts,
    setListSorts,
  } = useTaskSortsStore();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSorting = function (sortValue: SortType) {
    const params = new URLSearchParams(searchParams);
    if (sortValue === "") params.delete(sortingFor);
    else params.set(sortingFor, sortValue);

    if (usedFor === "table")
      setTableSorts({ ...tableSorts, [sortingFor]: sortValue });
    else if (usedFor === "board")
      setBoardSorts({ ...boardSorts, [sortingFor]: sortValue });
    else if (usedFor === "list")
      setListSorts({ ...listSorts, [sortingFor]: sortValue });

    replace(`${pathname}?${params.toString()}`);
  };

  const iconSize = 3;
  return (
    <>
      {!searchParams.get(sortingFor) && (
        <span
          className={
            withLabel ? "flex w-full items-center gap-1" : "h-fit w-fit"
          }
          onClick={() => handleSorting("asc")}
        >
          <ButtonIcon
            icon="sort"
            size={iconSize}
            padding="small"
            ariaLabel="sort button"
          />
          {withLabel && <span className="capitalize">{sortingFor}</span>}
        </span>
      )}
      {searchParams.get(sortingFor) === "asc" && (
        <span
          className={
            withLabel ? "flex w-full items-center gap-1" : "h-fit w-fit"
          }
          onClick={() => handleSorting("desc")}
        >
          <ButtonIcon
            icon="arrowUp"
            size={iconSize}
            padding="small"
            iconColor="fill-blue-400"
            bgColor="bg-blue-500/20"
            bgHoverColor="hover:bg-blue-700/20 active:bg-blue-700/20"
            ariaLabel="sort asc"
          />
          {withLabel && <span className="capitalize">{sortingFor}</span>}
        </span>
      )}
      {searchParams.get(sortingFor) === "desc" && (
        <span
          className={
            withLabel ? "flex w-full items-center gap-1" : "h-fit w-fit"
          }
          onClick={() => handleSorting("")}
        >
          <ButtonIcon
            icon="arrowDown"
            size={iconSize}
            padding="small"
            iconColor="fill-blue-300"
            bgColor="bg-blue-500/20"
            bgHoverColor="hover:bg-blue-700/20 active:bg-blue-700/20"
            ariaLabel="sort asc"
          />
          {withLabel && <span className="capitalize">{sortingFor}</span>}
        </span>
      )}
    </>
  );
}

export default TaskSortButton;
