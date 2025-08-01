import z from "zod";

export const mongoIdSchema = z
  .string("Id not a string")
  .length(24, { error: "InVialed id length" })
  .regex(/^[0-9a-f]+$/, { error: "InVialed Id characters" });

export const mongoIdsSetSchema = z.set(mongoIdSchema);
