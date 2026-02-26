import z from "zod";
import { createStatusSchema } from "./schema/status.schema";

export type { Status } from "@/../../Back-end/src/generated/prisma/client";

type CreateStatusInputs = z.infer<typeof createStatusSchema>;

export type { CreateStatusInputs };
