import z from "zod";

const listSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(64, "too long name")
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s\-_]+$/,
      "Only Arabic letters, English letters, numbers, spaces, hyphens and underscores allowed",
    ),
  workspaceId: z
    .string()
    .length(24)
    .regex(/^[0-9a-f]+$/),
});

export { listSchema };
