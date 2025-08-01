import { ICONS_MAP } from "@/constants/iconsMap";
import { useTaskContext } from "@/shared/tasks/components/TaskProvider";
import {
  TASK_PRIORITIES_LIST,
  TASK_STATUS,
} from "@/shared/tasks/consts/task.consts";
import {
  listBgHoverGradient,
  listRowBorder,
  listSlotHover,
} from "./styles/style";
import { getFormattedRangeDate } from "@/utils/helper";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import TaskDateUpdater from "@/shared/tasks/components/TaskDateUpdater";
import TaskPriorityUpdater from "@/shared/tasks/components/TaskPriorityUpdater";
import StatusCard from "@/shared/tasks/components/StatusCard";
import TaskStatusUpdater from "@/shared/tasks/components/TaskStatusUpdater";

function ListSlideRow() {
  const {
    task: { name, status },
  } = useTaskContext();

  const { icon, color } = TASK_STATUS[status];

  const Icon = ICONS_MAP[icon];

  return (
    <div
      className={`grid grid-cols-21 ${listRowBorder} text-base font-medium text-neutral-300 ${listBgHoverGradient}`}
    >
      <div className="col-span-10 flex items-center gap-2 p-2">
        <Icon className={`${color} size-4 shrink-0`} />
        <span className="line-clamp-1 truncate">{name}</span>
      </div>
      <ListSlotDueDate />
      <ListSlotPriority />
      <ListSlotStatus />
    </div>
  );
}

function ListSlotDueDate() {
  const {
    task: { startDate, endDate },
  } = useTaskContext();
  const isHaveDate = !!startDate && !!endDate;

  return (
    <div className={`col-span-3 p-2 ${listSlotHover}`}>
      <Menu>
        <MenuTrigger>
          {!isHaveDate ? (
            <ICONS_MAP.date className="size-4 fill-neutral-600" />
          ) : (
            <span className="line-clamp-1 truncate">
              {getFormattedRangeDate({ startDate, endDate })}
            </span>
          )}
        </MenuTrigger>
        <MenuContent>
          <TaskDateUpdater />
        </MenuContent>
      </Menu>
    </div>
  );
}

function ListSlotPriority() {
  const {
    task: { priority },
  } = useTaskContext();

  const curPriority = TASK_PRIORITIES_LIST.find(
    (item) => item.label.toLowerCase() === priority,
  );
  const Icon = ICONS_MAP.flag;

  const isHavePriority = priority !== "none" && curPriority;

  return (
    <div className={`col-span-3 p-2 ${listSlotHover}`}>
      <Menu>
        <MenuTrigger>
          {isHavePriority ? (
            <div className="flex items-center gap-2">
              <Icon className={`${curPriority.iconColor} size-4`} />
              <span>{curPriority.label}</span>
            </div>
          ) : (
            <Icon className="size-4 fill-neutral-600" />
          )}
        </MenuTrigger>
        <MenuContent>
          <TaskPriorityUpdater />
        </MenuContent>
      </Menu>
    </div>
  );
}

function ListSlotStatus() {
  const {
    task: { status },
  } = useTaskContext();

  return (
    <div className={`col-span-3 p-2 ${listSlotHover}`}>
      <Menu>
        <MenuTrigger>
          <StatusCard type={status} size="small" />
        </MenuTrigger>
        <MenuContent>
          <TaskStatusUpdater />
        </MenuContent>
      </Menu>
    </div>
  );
}

export default ListSlideRow;
