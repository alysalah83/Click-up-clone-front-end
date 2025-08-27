import { ICONS_MAP } from "@/constants/iconsMap";
import { TASK_PRIORITIES_LIST } from "../consts/task.consts";
import { TaskPriority } from "../types/task.types";
import { useMenu } from "@/components/ui/MenuCompound";

function TaskPriorityMenuList({
  action,
}: {
  action: (arg: TaskPriority) => void;
}) {
  const { toggleMenu } = useMenu();

  return (
    <section>
      <menu className="flex min-w-44 flex-col p-2">
        {TASK_PRIORITIES_LIST.map((item) => (
          <li
            className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition duration-200 hover:bg-neutral-600/20 dark:hover:bg-neutral-500/20"
            key={item.label}
            onClick={() => {
              action(item.label.toLowerCase() as TaskPriority);
              toggleMenu();
            }}
          >
            <span>
              <ICONS_MAP.flag className={`size-4 ${item.iconColor}`} />
            </span>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {item.label}
            </span>
          </li>
        ))}
      </menu>
      <div
        className="border-t border-neutral-200 p-2 dark:border-neutral-600"
        onClick={() => {
          action("none");
          toggleMenu();
        }}
      >
        <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition duration-200 hover:bg-neutral-600/20 dark:hover:bg-neutral-500/20">
          <span>
            <ICONS_MAP.notAllowed
              className={`size-4 text-neutral-600 dark:text-neutral-400`}
            />
          </span>
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Clear
          </span>
        </div>
      </div>
    </section>
  );
}

export default TaskPriorityMenuList;
