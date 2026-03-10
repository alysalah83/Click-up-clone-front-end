import AddStatus from "@/features/status/components/AddStatus";
import SortBtnWithMenu from "@/features/task/components/Sort/SortBtnWithMenu";
import { TASK_VIEWS } from "@/features/task/constants/tasks.const";
import { Button } from "@/shared/ui/Button";
import { Menu, MenuContent, MenuTrigger } from "@/shared/ui/Menu/MenuCompound";
import { usePathname } from "next/navigation";

function HeaderFeatures() {
  const pathname = usePathname();
  const isInTaskView = TASK_VIEWS.some((taskView) =>
    pathname.endsWith(`/${taskView}`),
  );
  const isInTableView = pathname.includes("table");

  return (
    <div className="mb-0.5 flex items-center gap-4">
      {isInTaskView && (
        <>
          <Menu>
            <MenuTrigger>
              <Button
                type="colored"
                size="smallWithMidPadding"
                rounded="large"
                ariaLabel="add status button"
              >
                Add Status
              </Button>
            </MenuTrigger>
            <MenuContent>
              <AddStatus />
            </MenuContent>
          </Menu>
          <SortBtnWithMenu withSortStatusField={isInTableView} />{" "}
        </>
      )}
    </div>
  );
}

export default HeaderFeatures;
