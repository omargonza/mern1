/*
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  tecnicos: z.string({
    required_error: "Tecnicos is required",
  }),
  materiales: z.string({
    required_error: "Materiales is required",
  }),
  date: z.date().refine(
    (value) => !value || /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(value),
    { message: "Invalid date format" }
  ),
});

*/
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  tecnicos: z.string({
    required_error: "Tecnicos is required",
  }),
  materiales: z.string({
    required_error: "Materiales is required",
  }),
 /* date: z
    .date()
    .refine(
      (value) =>
        !value ||
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(value) ||
        "Date must be in the format YYYY-MM-DDTHH:mm:ssZ",
      { message: "Invalid date format" }
    ),
}).refine((data) => {
  // Additional refinement for custom validations across fields
  if (data.title === "forbiddenTitle") {
    throw { title: "Title cannot be 'forbiddenTitle'" };
  }
  // Add more custom validations as needed
  return true;*/
  date: z.string().datetime().optional(),
});
