import { ICONS_MAP } from "@/constants/iconsMap";
import { hoverElementClasses } from "@/constants/styles";
import type { IconsMap } from "@/types/index.types";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocalTaskSorts } from "@/stores/useTableSearchParams";
import { LIST_ID_RESERVED_ROUTES } from "@/config/config";
import { use } from "react";

interface ButtonWithIconLabelProps {
  item: {
    icon: IconsMap;
    iconBgColor: string;
    label: string;
    href: string;
  };
  isActive: boolean;
  latestListIdPromise: Promise<string>;
}

function ButtonWithIconLabel({
  item,
  isActive,
  latestListIdPromise,
}: ButtonWithIconLabelProps) {
  const { listId } = useParams<{ listId: string }>();
  let newListId: string;
  const isHavingReservedListId = LIST_ID_RESERVED_ROUTES.has(listId);
  if (isHavingReservedListId) newListId = use(latestListIdPromise);
  else newListId = listId;

  const { icon, iconBgColor, label, href } = item;
  const Icon = ICONS_MAP[icon];

  const { boardSorts, tableSorts, listSorts } = useLocalTaskSorts();
  const isTable = item.label === "Table";
  const isBoard = item.label === "Board";
  const isList = item.label === "List";
  const isOverview = item.label === "Overview";

  let linkHref: string;
  if (isTable) {
    const tableSearchParams = new URLSearchParams();
    Object.entries(tableSorts).forEach(([key, value]) => {
      if (value) tableSearchParams.set(key, value);
    });
    linkHref = `/home/${newListId}${href}?${tableSearchParams.toString()}`;
  } else if (isBoard) {
    const boardSearchParams = new URLSearchParams();
    Object.entries(boardSorts).forEach(([key, value]) => {
      if (value) boardSearchParams.set(key, value);
    });
    linkHref = `/home/${newListId}${href}?${boardSearchParams.toString()}`;
  } else if (isList) {
    const listSearchParams = new URLSearchParams();
    Object.entries(listSorts).forEach(([key, value]) => {
      if (value) listSearchParams.set(key, value);
    });
    linkHref = `/home/${newListId}${href}?${listSearchParams.toString()}`;
  } else if (isOverview) linkHref = `/home${href}`;
  else linkHref = `/home/${newListId}${href}`;

  return (
    <Link href={linkHref}>
      <button
        type="button"
        aria-label={`${label} button`}
        className={`flex gap-1 px-2 py-1 ${
          isActive
            ? "rounded-tl-lg rounded-tr-lg border-b-2 border-neutral-50 pb-2 text-neutral-50"
            : "mb-2 rounded-lg text-neutral-300"
        } items-center transition duration-300 ${hoverElementClasses}`}
      >
        <span className={`rounded-sm p-0.5 ${iconBgColor}`}>
          <Icon className="h-3 w-3 fill-neutral-50" />
        </span>
        <span className={`text-xs font-medium capitalize`}>{label}</span>
      </button>
    </Link>
  );
}

export default ButtonWithIconLabel;
