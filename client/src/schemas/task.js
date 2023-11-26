import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  tecnicos: z.string().nonempty({ message: "Tecnicos is required" }),
  materiales: z.string().nonempty({ message: "Materiales is required" }),
});
