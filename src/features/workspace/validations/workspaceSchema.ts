import z from "zod";

const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "name is required" })
    .max(32, { error: "name max length is 32 character" })
    .regex(/^[a-zA-Z0-9\s.,!?-]+$/, { error: "Invalid characters detected" }),
  avatar: z.object({
    icon: z.string().trim(),
    color: z.string(),
  }),
});

export { workspaceSchema };
