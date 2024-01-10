// Importar express y el controlador de diagnóstico
import express from "express";
import diagnosticController from "../controllers/diagnostic.Controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {  electricalMaintenanceReportSchema  } from "../schemas/diagn.schema.js";

// Crear un router de Express para las rutas relacionadas con el sistema de diagnóstico
const diagnosticRouter = express.Router();

// Ruta para iniciar la monitorización en tiempo real
diagnosticRouter.post("/startMonitoring",auth, diagnosticController.startMonitoring);

// Ruta para detener la monitorización en tiempo real
diagnosticRouter.post("/stopMonitoring", auth, diagnosticController.stopMonitoring);

// Ruta para obtener informes de diagnóstico

diagnosticRouter.get("/diagnosticReports",auth, validateSchema ( electricalMaintenanceReportSchema) ,  diagnosticController.getDiagnosticReports);

// Ruta para registrar problemas detectados
diagnosticRouter.post("/registerIssue",auth, diagnosticController.registerIssue);

// Exportar el router
export default diagnosticRouter;
