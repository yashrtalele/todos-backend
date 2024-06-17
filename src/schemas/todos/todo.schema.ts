import zod from "zod";

export const TodoSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

export type Todo = zod.infer<typeof TodoSchema>;
