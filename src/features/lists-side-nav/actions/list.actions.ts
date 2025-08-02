"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionStatus } from "@/types/index.types";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";
import { listSchema } from "../validations/listSchema";
import { createListApi } from "@/lib/api/server/list/createList";
import { List } from "../types/list.types";
import { mongoIdSchema } from "@/lib/validations/global";
import { updateListApi } from "@/lib/api/server/list/updateList";
import { deleteListApi } from "@/lib/api/server/list/deleteList";
import { redirect } from "next/navigation";

export async function createList(
  workspaceId: string,
  prevState: ActionStatus,
  formData: FormData,
): Promise<ActionStatus> {
  try {
    const name = formData.get("name");
    const vialedList = listSchema.parse({ name, workspaceId });

    const list = await createListApi(vialedList);

    revalidateTag(`lists-${workspaceId}`);
    revalidatePath("/home/overview");
    return { status: "success", payload: { listId: list.id } };
  } catch (err: any) {
    if (err instanceof z.ZodError)
      return {
        status: "error",
        error: err.issues[0]?.message || "Validation failed",
      };

    return {
      status: "error",
      error: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

export async function updateList(
  workspaceId: string,
  listId: string,
  updatedFields: Partial<List>,
): Promise<ActionStatus> {
  try {
    const vialedId = mongoIdSchema.parse(listId);
    const vialedUpdatedFields = listSchema.partial().parse(updatedFields);
    await updateListApi(vialedId, vialedUpdatedFields);
    revalidateTag(`lists-${workspaceId}`);

    return { status: "success" };
  } catch (err) {
    if (err instanceof z.ZodError)
      return { status: "error", error: err.issues[0]?.message };
    if (err instanceof Error) return { status: "error", error: err.message };
    else
      return {
        status: "error",
        error: "something went wrong while updating list",
      };
  }
}

export async function deleteList(
  workspaceId: string,
  listId: string,
  isCurrentListIdDeleted: boolean,
): Promise<ActionStatus> {
  try {
    const vialedListId = mongoIdSchema.parse(listId);
    await deleteListApi(vialedListId);
    revalidateTag(`lists-${workspaceId}`);
  } catch (err: any) {
    console.error(err);
    return { status: "error", error: err.message || "Something went wrong" };
  }
  if (isCurrentListIdDeleted) return redirect("/home/overview");
  else return { status: "success" };
}
