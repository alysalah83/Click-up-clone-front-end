"use client";

import { memo, useRef, useState } from "react";
import { slotPaddingClasses, tableGrid } from "../styles/style";
import { ICONS_MAP } from "@/constants/iconsMap";
import ButtonIcon from "@/components/common/ButtonIcon";
import Button from "@/components/common/Button";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { useClientAddTask } from "@/shared/tasks/hooks/useClientAddTask";
import { TaskDateRange, TaskPriority } from "@/shared/tasks/types/task.types";
import { TASK_PRIORITIES_LIST } from "@/shared/tasks/consts/task.consts";
import { getFormattedRangeDate } from "@/utils/helper";
import TaskPriorityMenuList from "@/shared/tasks/components/TaskPriorityMenuList";

function TableAddTaskRow() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleToggleAddTaskOpen = () => setIsAddTaskOpen((cur) => !cur);
  const handleCloseAddTask = () => setIsAddTaskOpen(false);

  return (
    <div
      onClick={() => {
        if (!isAddTaskOpen) handleToggleAddTaskOpen();
      }}
      ref={containerRef}
      className={`${tableGrid} ${isAddTaskOpen ? "" : "cursor-pointer"} border-b border-neutral-300 bg-neutral-100 py-1 text-sm font-medium text-neutral-500 transition duration-300 hover:bg-neutral-200 active:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-300 dark:hover:bg-neutral-500/20 dark:active:bg-neutral-500/20`}
    >
      {isAddTaskOpen ? (
        <TableOpenedAddTaskRow
          isAddTaskOpen={isAddTaskOpen}
          containerRef={containerRef}
          onClose={handleCloseAddTask}
        />
      ) : (
        <TableClosedAddTaskRow />
      )}
    </div>
  );
}

function TableOpenedAddTaskRow({
  containerRef,
  onClose,
  isAddTaskOpen,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isAddTaskOpen: boolean;
  onClose: () => void;
}) {
  const {
    nameValue,
    isNameValid,
    handleNameChange,
    handleAddTask,
    startDate,
    endDate,
    handleDateChange,
    priority,
    handlePriorityChange,
  } = useClientAddTask({
    onClose,
    isAddTaskOpen,
    containerRef,
  });

  return (
    <form onSubmit={handleAddTask} className="col-span-19 grid">
      <div className="col-span-12 col-start-2 flex items-center gap-1 pl-[3px]">
        <ButtonIcon
          icon="circleDotted"
          ariaLabel="select task status button"
          padding="small"
          size={4.5}
        />
        <input
          autoFocus
          placeholder="Task Name or type"
          value={nameValue}
          onChange={(e) => handleNameChange(e.target.value)}
          className="h-full w-full py-2 outline-0"
        />
      </div>
      <div className="col-span-7 col-start-14 flex items-center justify-end gap-4 py-2 pr-4">
        <TableAddTaskFeaturesBtns
          dateRanges={{ startDate, endDate }}
          onDateChange={handleDateChange}
          priority={priority}
          onPriorityChange={handlePriorityChange}
        />
        <div className="flex items-center gap-2">
          <Button
            type="secondary"
            size="small"
            ariaLabel="cancel add task"
            buttonFor="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            ariaLabel="Save button"
            extraClasses="flex items-center gap-1"
            buttonFor="submit"
            size="small"
            disabled={!isNameValid}
          >
            <span>Save</span>
            <ICONS_MAP.leftArrow />
          </Button>
        </div>
      </div>
    </form>
  );
}

function TableAddTaskFeaturesBtns({
  onDateChange,
  dateRanges,
  priority,
  onPriorityChange,
}: {
  dateRanges: TaskDateRange;
  onDateChange: (dateRange: TaskDateRange) => void;
  priority: TaskPriority;
  onPriorityChange: (arg: TaskPriority) => void;
}) {
  const priorityObj =
    priority !== "none" &&
    TASK_PRIORITIES_LIST.find(
      (item) => item.label.toLocaleLowerCase() === priority,
    );

  return (
    <div className="flex gap-1">
      <Menu>
        <MenuTrigger>
          <ButtonIcon
            type="bordered"
            label={
              dateRanges.startDate && dateRanges.endDate
                ? getFormattedRangeDate(dateRanges)
                : ""
            }
            size={3.5}
            ariaLabel="open date menu button"
            icon="date"
          />
        </MenuTrigger>
        <MenuContent>
          <DateRangePicker
            dateRanges={dateRanges}
            onDateChange={onDateChange}
          />
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger>
          <ButtonIcon
            type="bordered"
            size={3.5}
            label={priorityObj ? priorityObj.label : ""}
            iconColor={priorityObj ? priorityObj.iconColor : ""}
            ariaLabel="open priority menu button"
            icon="flag"
          />
        </MenuTrigger>
        <MenuContent>
          <TaskPriorityMenuList action={onPriorityChange} />
        </MenuContent>
      </Menu>
    </div>
  );
}

const TableClosedAddTaskRow = memo(function TableClosedAddTaskRow() {
  const Icon = ICONS_MAP.plus;

  return (
    <div
      className={`col-span-1 flex items-center justify-center ${slotPaddingClasses}`}
    >
      <Icon className={`size-3.5 text-neutral-600`} />
    </div>
  );
});

export default TableAddTaskRow;
