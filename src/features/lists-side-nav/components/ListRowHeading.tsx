"use client";

import { hoverElementClasses } from "@/constants/styles";
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/MenuCompound";
import ButtonIcon from "@/components/common/ButtonIcon";
import { ICONS_SIZE } from "@/shared/options-menu/consts/consts";
import AddButton from "@/components/common/AddButton";
import {
  ToolTip,
  ToolTipMessage,
  ToolTipTrigger,
} from "@/components/ui/ToolTipCompound ";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
} from "@/components/ui/DropdownCompound";
import OptionsListMenuItems from "./OptionsListMenuItems";
import { useAddTask } from "@/shared/tasks/hooks/useAddTask";
import { useParams } from "next/navigation";
import ListName from "./ListName";
import { useList } from "./ListContext";
import Link from "next/link";
import { List } from "../types/list.types";

function ListRowHeading({ list }: { list: List }) {
  const { listId } = useParams<{ listId: string }>();
  const isActive = list.id === listId;
  return (
    <Dropdown isAbsolute={false}>
      <DropdownTrigger>
        <div
          className={`flex items-center justify-between rounded-lg px-2 py-1 transition duration-300 ${isActive ? "bg-neutral-900/10 dark:bg-neutral-200/10" : hoverElementClasses.replace("cursor-pointer", "cursor-default")}`}
        >
          <ListRowHeadingTitle list={list} />

          <ListRowHeadingButtons listId={list.id} />
        </div>
      </DropdownTrigger>
    </Dropdown>
  );
}

export function ListRowHeadingTitle({ list }: { list: List }) {
  const { isRenameOpen } = useList();
  return (
    <div
      className={`flex w-full items-center ${isRenameOpen ? "" : "max-w-3/4"} gap-1`}
    >
      <Link href={`/home/${list.id}/board`}>
        <ButtonIcon
          icon="list"
          ariaLabel="project list item"
          size={ICONS_SIZE}
        />
      </Link>
      <ListName />
    </div>
  );
}

function ListRowHeadingButtons({ listId }: { listId: string }) {
  const { addTask } = useAddTask(listId);
  const { isRenameOpen } = useList();

  return (
    !isRenameOpen && (
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <Menu>
            <MenuTrigger>
              <ToolTip>
                <ToolTipTrigger>
                  <ButtonIcon
                    icon="dotsRow"
                    ariaLabel="list show more button"
                    size={ICONS_SIZE}
                  />
                </ToolTipTrigger>
                <ToolTipMessage>Space settings</ToolTipMessage>
              </ToolTip>
            </MenuTrigger>
            <MenuContent>
              <OptionsListMenuItems />
            </MenuContent>
          </Menu>

          <AddButton
            toolTipMessage="Create task"
            ariaLabel="Create task button"
            onClick={() =>
              addTask({
                listId,
                name: "Untitled",
                status: "toDo",
              })
            }
          />
        </DropdownMenu>
      </div>
    )
  );
}

export default ListRowHeading;
