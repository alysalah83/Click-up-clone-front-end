import { ButtonWithIconLabel } from "@/shared/ui/Button";
import { HEADER_MENU } from "./Header.const";
import { usePathname } from "next/navigation";
import { List } from "@/features/list/types";

function NavButtons({
  latestListIdPromise,
}: {
  latestListIdPromise: Promise<{ id: List["id"] } | undefined>;
}) {
  const pathname = usePathname();

  return HEADER_MENU.map((item) => (
    <ButtonWithIconLabel
      item={item}
      key={item.href}
      latestListIdPromise={latestListIdPromise}
      isActive={pathname.includes(item.href)}
    />
  ));
}

export default NavButtons;
