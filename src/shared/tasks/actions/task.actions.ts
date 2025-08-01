"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientCreatedTask, ClientTask } from "@/shared/tasks/types/task.types";
import z from "zod";
import { createTaskSchema, taskSchema } from "../validations/taskSchema";
import { createTaskApi } from "../../../lib/api/server/task/createTask";
import {
  deleteTaskApi,
  deleteTasksApi,
} from "../../../lib/api/server/task/deleteTask";
import {
  updateTaskApi,
  updateTasksApi,
} from "../../../lib/api/server/task/updateTask";
import {
  mongoIdSchema,
  mongoIdsSetSchema,
} from "../../../lib/validations/global";

export async function createTask(clientCreatedTask: ClientCreatedTask) {
  try {
    const vialedClientCreatedTask = createTaskSchema.parse(clientCreatedTask);
    const newTask = await createTaskApi(vialedClientCreatedTask);

    return newTask;
  } catch (err: any) {
    if (err instanceof z.ZodError)
      throw new Error(err.issues[0]?.message || "");
    console.log(err);
    throw new Error(err.message || "Something went wrong");
  }
}

export async function deleteTask(taskId: string) {
  try {
    const validTaskId = mongoIdSchema.parse(taskId);

    const deletedTask = await deleteTaskApi(validTaskId);

    return deletedTask;
  } catch (err: any) {
    if (err instanceof z.ZodError)
      throw new Error(err.issues[0]?.message || "");
    console.log(err);
    throw new Error(err.message || "Something went wrong");
  }
}

export async function updateTask(
  taskId: string,
  updatedTaskFields: Partial<ClientTask>,
) {
  try {
    const ValidTaskId = mongoIdSchema.parse(taskId);
    const validUpdatedTaskFields = taskSchema
      .partial()
      .parse(updatedTaskFields);

    const updatedTask = await updateTaskApi(
      ValidTaskId,
      validUpdatedTaskFields,
    );

    return updatedTask;
  } catch (err: any) {
    if (err instanceof z.ZodError)
      throw new Error(err.issues[0]?.message || "");
    console.log(err);
    throw new Error(err.message || "Something went wrong");
  }
}

export async function updateTasks(
  tasksId: Set<string>,
  updatedTasksFields: Partial<ClientTask>,
) {
  try {
    const ValidTasksId = mongoIdsSetSchema.parse(tasksId);
    const validUpdatedTaskFields = taskSchema
      .partial()
      .parse(updatedTasksFields);

    const updatedTasks = await updateTasksApi(
      [...ValidTasksId],
      validUpdatedTaskFields,
    );

    return updatedTasks;
  } catch (err: any) {
    if (err instanceof z.ZodError)
      throw new Error(err.issues[0]?.message || "");
    console.log(err);
    throw new Error(err.message || "Something went wrong");
  }
}

export async function deleteTasks({
  listId,
  tasksIdSet,
}: {
  listId: string;
  tasksIdSet: Set<string>;
}) {
  try {
    const validListId = mongoIdSchema.parse(listId);
    const validTasksIdSet = mongoIdsSetSchema.parse(tasksIdSet);
    const deletedTask = await deleteTasksApi(validListId, [...validTasksIdSet]);

    return deletedTask;
  } catch (err: any) {
    if (err instanceof z.ZodError)
      throw new Error(err.issues[0]?.message || "");
    console.log(err);
    throw new Error(err.message || "Something went wrong");
  }
}
