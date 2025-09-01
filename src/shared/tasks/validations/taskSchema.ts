import z from "zod";

const taskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(128, "too long name")
    .regex(
      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s\-_]+$/,
      "Only Arabic letters, English letters, numbers, spaces, hyphens and underscores allowed",
    ),
  status: z.enum(["toDo", "inProgress", "complete"]),
  listId: z
    .string({ error: "inVialed Id" })
    .length(24)
    .regex(/^[0-9a-f]+$/),
  priority: z.enum(["urgent", "high", "normal", "low", "none"]),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

const createTaskSchema = taskSchema.extend({
  status: z.enum(["toDo", "inProgress", "complete"]).default("toDo").optional(),
  priority: z
    .enum(["urgent", "high", "normal", "low", "none"])
    .default("none")
    .optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
});

export { taskSchema, createTaskSchema };
