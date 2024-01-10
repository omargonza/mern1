import { z } from "zod";

// Esquema para el informe de diagnóstico de mantenimiento eléctrico
export const electricalMaintenanceReportSchema = z.object({
  taskId: z.string().uuid({ message: "ID de tarea es obligatorio" }),
  timestamp: z.string().datetime({ message: "La marca de tiempo es obligatoria" }),
  component: z.string().nonempty({ message: "El componente es obligatorio" }),
  exposureToWeather: z.enum(["Indoor", "Outdoor", "Exposed"], { message: "La exposición al clima es obligatoria" }),
  preventiveMaintenanceDate: z.string().datetime().optional(),
  lifeExpectancy: z.object({
    initialValue: z.number().min(0).optional(),
    remainingValue: z.number().min(0).optional(),
    unit: z.string().optional(),
  }).optional(),
  // Otros campos relevantes para el informe de diagnóstico de mantenimiento eléctrico
});
