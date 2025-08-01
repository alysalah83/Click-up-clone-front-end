import { ClientTask } from "@/shared/tasks/types/task.types";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiTakeToken } from "../../axios/instanceServer";

const apiWithToken = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth-token")?.value;
  if (!token) throw new Error("User is not Authenticated");
  return apiTakeToken(token);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateTaskApi(
  taskId: string,
  updatedData: Partial<ClientTask>,
) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.patch(`/tasks/${taskId}`, updatedData);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.response?.data?.message || "couldn't update task");
  }
}

export async function updateTasksApi(
  tasksId: string[],
  updatedFields: Partial<ClientTask>,
) {
  try {
    const authedApi = await apiWithToken();
    const res = await authedApi.patch("/tasks/bulk", {
      tasksId,
      updatedFields,
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response?.data.message || "couldn't update task");
    if (error instanceof Error) throw new Error(error.message);
  }
}
