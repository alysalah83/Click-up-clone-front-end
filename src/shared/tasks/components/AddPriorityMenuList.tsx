"use client";

import { ICONS_MAP } from "@/constants/iconsMap";
import { useMenu } from "@/components/ui/MenuCompound";
import { TASK_PRIORITIES_LIST } from "../consts/task.consts";
import { TaskPriority } from "../types/task.types";

const defaultPriority = "none";

function AddPriorityMenuList({
  onChange,
}: {
  onChange: (arg: TaskPriority) => void;
}) {
  const { toggleMenu } = useMenu();

  const handleAddPriority = function (priority: TaskPriority) {
    onChange(priority);
    toggleMenu();
  };

  const handleClearPriority = function () {
    onChange(defaultPriority);
    toggleMenu();
  };

  return (
    <section>
      <menu className="flex min-w-44 flex-col p-2">
        {TASK_PRIORITIES_LIST.map((item) => (
          <li
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition duration-200 hover:bg-neutral-500/20"
            key={item.label}
            onClick={() =>
              handleAddPriority(item.label.toLocaleLowerCase() as TaskPriority)
            }
          >
            <span>
              <ICONS_MAP.flag className={`size-4 ${item.iconColor}`} />
            </span>
            <span className="text-sm font-medium text-neutral-200">
              {item.label}
            </span>
          </li>
        ))}
      </menu>
      <div
        className="border-t border-neutral-600 p-2"
        onClick={handleClearPriority}
      >
        <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition duration-200 hover:bg-neutral-500/20">
          <span>
            <ICONS_MAP.notAllowed className={`size-4 text-neutral-400`} />
          </span>
          <span className="text-sm font-medium text-neutral-200">Clear</span>
        </div>
      </div>
    </section>
  );
}

export default AddPriorityMenuList;
