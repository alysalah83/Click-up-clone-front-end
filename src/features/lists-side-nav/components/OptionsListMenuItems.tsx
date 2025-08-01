import OptionsMenuItem from "@/shared/options-menu/components/OptionsMenuItem";
import { useListMenuItems } from "../hooks/useListMenuItems";

function OptionsListMenuItems() {
  const listMenuItems = useListMenuItems();
  return (
    <menu className="min-w-3xs p-2">
      {listMenuItems.map((item) => (
        <OptionsMenuItem item={item} key={item.label} />
      ))}
    </menu>
  );
}

export default OptionsListMenuItems;
