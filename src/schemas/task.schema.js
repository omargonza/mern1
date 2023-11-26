/*import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});
*/
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  tecnicos: z.string().nonempty({ message: "Tecnicos is required" }),
  materiales: z.string().nonempty({ message: "Materiales is required" }),
  date: z.string().datetime().optional(),
  user: z.string().uuid().optional(),
});
