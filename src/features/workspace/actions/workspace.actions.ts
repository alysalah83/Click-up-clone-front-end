"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionStatus } from "@/types/index.types";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";
import { workspaceSchema } from "../validations/workspaceSchema";
import { deleteWorkspaceApi } from "../../../lib/api/server/workspace/deleteWorkspace";
import { createWorkspaceApi } from "../../../lib/api/server/workspace/createWorkspace";
import { updateWorkspaceApi } from "../../../lib/api/server/workspace/updateWorkspace";
import { mongoIdSchema } from "../../../lib/validations/global";
import { Avatar, ClientWorkspace } from "../types/workspace.types";
import { createListApi } from "@/lib/api/server/list/createList";
import { redirect } from "next/navigation";

export async function createWorkspace(
  avatar: Avatar,
  prevState: ActionStatus,
  formData: FormData,
): Promise<ActionStatus> {
  let listId;
  try {
    const name = formData.get("name");
    const vialedWorkspace = workspaceSchema.parse({ name, avatar });

    const workspace = await createWorkspaceApi(vialedWorkspace);
    const list = await createListApi({
      workspaceId: workspace.id,
      name: "List",
    });
    listId = list.id;

    revalidateTag("workspaces");
    revalidatePath("/home/overview");
  } catch (err) {
    console.log(err);
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
  redirect(`/home/${listId}/board`);
}

export async function updateWorkspace(
  workspaceId: string,
  updatedFields: Partial<ClientWorkspace>,
): Promise<ActionStatus> {
  try {
    const vialedId = mongoIdSchema.parse(workspaceId);
    const vialedUpdateFields = workspaceSchema.partial().parse(updatedFields);

    const workspace = await updateWorkspaceApi(vialedId, vialedUpdateFields);

    console.log(workspace);

    revalidateTag("workspaces");

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError)
      return {
        status: "error",
        error:
          error.issues[0]?.message ||
          "something went wrong while trying to update workspace",
      };
    return {
      status: "error",
      error:
        error instanceof Error
          ? error.message
          : "something went wrong while trying to update workspace",
    };
  }
}

export async function deleteWorkspace(id: string): Promise<ActionStatus> {
  try {
    const vialedId = mongoIdSchema.parse(id);

    await deleteWorkspaceApi(vialedId);
    revalidateTag("workspaces");
    return { status: "success" };
  } catch (err: any) {
    console.log(err);
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
