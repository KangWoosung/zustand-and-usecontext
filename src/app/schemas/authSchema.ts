/*  2024-06-04 06:31:26


*/

import { z } from "zod";

export const authSchema = z.object({
  userName: z
    .string()
    .min(4, { message: "Username must be at least 4 characters long" }),
});
export type AuthSchemaType = z.infer<typeof authSchema>;
