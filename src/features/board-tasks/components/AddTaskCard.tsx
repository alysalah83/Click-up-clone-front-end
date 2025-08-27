import Button from "@/components/common/Button";
import { useBoard } from "./BoardContext";
import { ICONS_MAP } from "@/constants/iconsMap";
import {
  TaskDateRange,
  TaskPriority,
  TaskStatus,
} from "@/shared/tasks/types/task.types";
import { useClientAddTask } from "@/shared/tasks/hooks/useClientAddTask";
import { BOARD_TASK_ICON_SIZE, FEATURES } from "../consts/board";
import ButtonIcon from "@/components/common/ButtonIcon";
import { hoverElementClasses } from "@/constants/styles";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { TASK_PRIORITIES_LIST } from "@/shared/tasks/consts/task.consts";
import { getFormattedRangeDate } from "@/utils/helper";
import TaskPriorityMenuList from "@/shared/tasks/components/TaskPriorityMenuList";

interface AddTaskProps {
  taskStatus: TaskStatus;
  isAddTaskPanelOpened: boolean;
}

function AddTaskCard({ taskStatus, isAddTaskPanelOpened }: AddTaskProps) {
  const { taskPanelRef, handleCloseAddTaskPanel } = useBoard();
  const {
    nameValue,
    handleNameChange,
    startDate,
    endDate,
    handleDateChange,
    handlePriorityChange,
    isNameValid,
    priority,
    handleAddTask,
  } = useClientAddTask({
    containerRef: taskPanelRef,
    isAddTaskOpen: isAddTaskPanelOpened,
    onClose: handleCloseAddTaskPanel,
    curStatus: taskStatus,
  });

  return (
    <form
      className="flex flex-col gap-3 rounded-lg border-neutral-100 bg-neutral-100 p-2 text-neutral-600/80 dark:border-neutral-500 dark:bg-neutral-900 dark:text-neutral-400/80"
      ref={taskPanelRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") return handleCloseAddTaskPanel();
        if (e.key === "enter") return handleAddTask(e);
      }}
      onSubmit={handleAddTask}
    >
      <div className="flex items-center gap-2">
        <input
          autoFocus
          name="name"
          value={nameValue}
          onChange={(e) => handleNameChange(e.target.value)}
          type="text"
          placeholder="Task Name..."
          className="w-full px-1 py-1 text-sm text-neutral-900 outline-0 dark:text-neutral-100"
        />
        <Button
          ariaLabel="save new task button"
          size="small"
          disabled={!isNameValid}
        >
          <span className="flex items-center gap-1">
            <span>Save</span>
            <ICONS_MAP.leftArrow className="size-3 fill-neutral-100 text-neutral-100 dark:fill-neutral-900 dark:text-neutral-900" />
          </span>
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        <BoardAddTaskFeatureBtns
          onDateChange={handleDateChange}
          onPriorityChange={handlePriorityChange}
          dateRanges={{ startDate, endDate }}
          priority={priority}
        />
      </div>
    </form>
  );
}

function BoardAddTaskFeatureBtns({
  onDateChange,
  onPriorityChange,
  dateRanges,
  priority,
}: {
  onPriorityChange: (priority: TaskPriority) => void;
  onDateChange: (dateRange: TaskDateRange) => void;
  dateRanges: TaskDateRange;
  priority: TaskPriority;
}) {
  const [dataObj, priorityObj] = FEATURES;
  const curPriority = TASK_PRIORITIES_LIST.find(
    (prio) => prio.label.toLowerCase() === priority,
  );
  return (
    <>
      <Menu>
        <MenuTrigger>
          <div
            className={`flex w-full items-center gap-1 rounded-lg p-1 ${hoverElementClasses}`}
          >
            <ButtonIcon
              icon={dataObj.icon}
              ariaLabel={`${dataObj.label} button`}
              size={BOARD_TASK_ICON_SIZE}
            />
            <span className="text-sm">
              {dateRanges.startDate && dateRanges.endDate
                ? getFormattedRangeDate(dateRanges)
                : dataObj.label}
            </span>
          </div>
        </MenuTrigger>
        <MenuContent>
          <DateRangePicker
            onDateChange={onDateChange}
            dateRanges={dateRanges}
          />
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger>
          <div
            className={`flex w-full items-center gap-1 rounded-lg p-1 ${hoverElementClasses}`}
          >
            <ButtonIcon
              icon={priorityObj.icon}
              iconColor={priority !== "none" ? curPriority?.iconColor : ""}
              ariaLabel={`${priorityObj.label} button`}
              size={BOARD_TASK_ICON_SIZE}
            />
            <span className="text-sm capitalize">
              {priority === "none" ? priorityObj.label : priority}
            </span>
          </div>
        </MenuTrigger>
        <MenuContent>
          <TaskPriorityMenuList action={onPriorityChange} />
        </MenuContent>
      </Menu>
    </>
  );
}

export default AddTaskCard;
