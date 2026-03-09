import SortBtnWithMenu from "@/features/task/components/Sort/SortBtnWithMenu";
import { TASK_VIEWS } from "@/features/task/constants/tasks.const";
import { usePathname } from "next/navigation";

function HeaderFeatures() {
  const pathname = usePathname();
  const isInTaskView = TASK_VIEWS.some((taskView) =>
    pathname.includes(taskView),
  );
  const isInTableView = pathname.includes("table");

  return (
    <div className="flex items-center gap-4">
      {isInTaskView && <SortBtnWithMenu withSortStatusField={isInTableView} />}
    </div>
  );
}

export default HeaderFeatures;
