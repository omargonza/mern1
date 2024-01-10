import React, { useState, useEffect } from "react";
import { useSocket, initSocket } from "../../../../src/service/socketService.js"; // Cambiado aquí
import { useTasks } from "../../context/tasksContext.jsx";

const DiagnosticMonitor = () => {
  const [diagnosticReports, setDiagnosticReports] = useState([]);
  const { getTasks, tasks, createTask } = useTasks();
  const socket = initSocket(); // Cambiado aquí

  useEffect(() => {
    // Inicializa el socket cuando el componente se monta

    // Maneja el evento de informes de diagnóstico
    socket.on("diagnosticReports", (reports) => {
      setDiagnosticReports(reports);
    });

    return () => {
      // Desconecta el socket cuando el componente se desmonta
      socket.disconnect();
    };
  }, [socket]); // Cambiado aquí

  const handleStartMonitoring = () => {
    socket.emit("startMonitoring"); // Emite el evento para iniciar la monitorización en tiempo real
    getTasks(); // Llama a la función para obtener tareas (simulación)
  };

  const handleStopMonitoring = () => {
    socket.emit("stopMonitoring"); // Emite el evento para detener la monitorización en tiempo real
  };

  const handleCreateTask = () => {
    createTask({
      title: "Nueva Tarea",
      description: "Descripción de la nueva tarea",
      tecnicos: "Nombre del técnico",
      materiales: "Materiales necesarios",
    });
  };

  return (
    <div>
      <h1>Monitorización en Tiempo Real</h1>
      <button onClick={handleStartMonitoring}>Iniciar Monitorización</button>
      <button onClick={handleStopMonitoring}>Detener Monitorización</button>

      <h2>Informes de Diagnóstico:</h2>
      <ul>
        {diagnosticReports.map((report, index) => (
          <li key={index}>{`${report.timestamp}: ${report.issues.join(", ")}`}</li>
        ))}
      </ul>

      <h2>Tareas:</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>

      <button onClick={handleCreateTask}>Crear Nueva Tarea</button>
    </div>
  );
};

export default DiagnosticMonitor;

