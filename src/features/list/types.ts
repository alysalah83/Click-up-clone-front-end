import z from "zod";
import { createListSchema, updateListSchema } from "./schema/list.schema";
import { Prisma } from "@../../../../Back-end/src/generated/prisma/client";
export type { List } from "@../../../../Back-end/src/generated/prisma/client";

type CreateListInput = z.infer<typeof createListSchema>;
type UpdateListInput = z.infer<typeof updateListSchema>;

type ListWithStatuses = Prisma.ListGetPayload<{ include: { status: true } }>;

export type { CreateListInput, UpdateListInput, ListWithStatuses };
