// Importar el modelo ElectricIssue y otras dependencias necesarias
import ElectricIssue from "../models/electricIssue.model.js";
import { startRealTimeMonitoring, stopRealTimeMonitoring, getDiagnosticReports } from "../service/diagnosticService.js";

const diagnosticController = {
  startMonitoring: async (req, res) => {
    try {
      // Lógica para iniciar la monitorización en tiempo real
      await startRealTimeMonitoring();
      return res.status(200).json({ success: true, message: "Monitoreo en tiempo real iniciado." });
    } catch (error) {
      console.error("Error al iniciar la monitorización en tiempo real:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
  },

  stopMonitoring: async (req, res) => {
    try {
      // Lógica para detener la monitorización en tiempo real
      await stopRealTimeMonitoring();
      return res.status(200).json({ success: true, message: "Monitoreo en tiempo real detenido." });
    } catch (error) {
      console.error("Error al detener la monitorización en tiempo real:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
  },

  getDiagnosticReports: async (req, res) => {
    try {
      // Lógica para obtener informes de diagnóstico
      const reports = await getDiagnosticReports();
      return res.status(200).json({ success: true, reports });
    } catch (error) {
      console.error("Error al obtener informes de diagnóstico:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
  },

  registerIssue: async (req, res) => {
    try {
      const { taskId, issueType, details } = req.body;
      
      // Lógica para registrar problemas detectados
      const newElectricIssue = new ElectricIssue({
        taskId,
        issueType,
        details,
      });
      await newElectricIssue.save();

      return res.status(201).json({ success: true, message: "Problema eléctrico registrado exitosamente." });
    } catch (error) {
      console.error("Error al registrar problema eléctrico:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
  },
};

export default diagnosticController;
