/*  2024-06-04 08:41:44

type TodoType = {
    id: string;
    title: string;
    content: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt?: Date | undefined;
}

*/

import { z } from "zod";

export const addTodoSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" }),
  content: z
    .string()
    .min(4, { message: "Content must be at least 4 characters long" }),
  isCompleted: z.boolean().optional(),
});

export type AddTodoSchemaType = z.infer<typeof addTodoSchema>;
