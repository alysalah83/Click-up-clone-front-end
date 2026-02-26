import { Menu, MenuTrigger, MenuContent } from "@/shared/ui/Menu/MenuCompound";
import { ICONS_MAP } from "@/shared/icons/icons-map";
import { hoverElementClasses } from "@/shared/constants/styles";
import { Button } from "@/shared/ui/Button";
import TaskSortButton from "@/features/task/components/TaskSortButton";

function SortBtn() {
  return (
    <span>
      <Menu>
        <MenuTrigger>
          <Button
            rounded="full"
            size="smallWithMidPadding"
            type="secondary"
            ariaLabel="sortButton"
            extraClasses="flex items-center gap-1"
          >
            <ICONS_MAP.sort className="size-3" />
            <span>Sort</span>
          </Button>
        </MenuTrigger>
        <MenuContent>
          <SortMenu />
        </MenuContent>
      </Menu>
    </span>
  );
}

function SortMenu() {
  return (
    <div className="flex min-w-48 flex-col gap-3 p-3">
      <h3 className="px-3 pt-1 text-sm font-medium text-neutral-700 dark:text-neutral-500">
        Sort By
      </h3>
      <ul className="text-base font-medium text-neutral-900 dark:text-neutral-300">
        <li
          className={`${hoverElementClasses} flex items-center gap-1 rounded-lg px-3 py-1 transition duration-300`}
        >
          <TaskSortButton
            sortingFor="priority"
            withLabel={true}
            usedFor="board"
          />
        </li>
        <li
          className={`${hoverElementClasses} flex items-center gap-1 rounded-lg px-3 py-1 transition duration-300`}
        >
          <TaskSortButton
            sortingFor="dueDate"
            withLabel={true}
            usedFor="board"
          />
        </li>
        <li
          className={`${hoverElementClasses} rounded-lg px-3 py-1 transition duration-300`}
        >
          <TaskSortButton
            sortingFor="createdAt"
            withLabel={true}
            usedFor="board"
          />
        </li>
      </ul>
    </div>
  );
}

export default SortBtn;
