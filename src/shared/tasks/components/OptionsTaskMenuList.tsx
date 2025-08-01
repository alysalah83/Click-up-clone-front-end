import OptionsMenuItem from "../../options-menu/components/OptionsMenuItem";
import { useTasksMenuItems } from "@/shared/tasks/hooks/useTasksMenuItems";

function OptionsTaskMenuList() {
  const menuItemsArr = useTasksMenuItems();
  return (
    <menu className="min-w-3xs p-2">
      {menuItemsArr.map((item) => (
        <OptionsMenuItem item={item} key={item.label} />
      ))}
    </menu>
  );
}

export default OptionsTaskMenuList;
