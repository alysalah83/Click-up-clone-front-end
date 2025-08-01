import z from "zod";

const listSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(64, "too long name")
    .regex(/^[a-zA-Z0-9\s.,!?-]+$/, "Invalid characters detected"),
  workspaceId: z
    .string()
    .length(24)
    .regex(/^[0-9a-f]+$/),
});

export { listSchema };
