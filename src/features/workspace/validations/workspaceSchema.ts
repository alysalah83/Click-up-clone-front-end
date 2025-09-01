import z from "zod";

const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "name is required" })
    .max(32, { error: "name max length is 32 character" })
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s\-_]+$/,
      "Only Arabic letters, English letters, numbers, spaces, hyphens and underscores allowed",
    ),
  avatar: z.object({
    icon: z.string().trim(),
    color: z.string(),
  }),
});

export { workspaceSchema };
