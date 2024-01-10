import React, { useState, useEffect } from "react";
import { useSocket, initSocket } from "../../../src/service/diagnosticService.js";
import { useTasks } from "../context/tasksContext.jsx";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const DiagnosticMonitor = () => {
  const [diagnosticReports, setDiagnosticReports] = useState([]);
  const { getTasks, tasks, createTask } = useTasks();
  const socket = initSocket();

  useEffect(() => {
    socket.on("diagnosticReports", (reports) => {
      setDiagnosticReports(reports);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleStartMonitoring = () => {
    socket.emit("startMonitoring");
    getTasks();
  };

  const handleStopMonitoring = () => {
    socket.emit("stopMonitoring");
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
    <section className="bg-blue-500">
      <Navbar className="bg-slate-400 p-10">
        <Container>
          <Navbar.Brand>
            <h1 className="text-5xl py-2 font-bold text-gray-500">
              Monitorización en Tiempo Real
            </h1>
          </Navbar.Brand>
          <Button
            style={{
              backgroundColor: "#85D615",
              color: "darkgrey",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={handleStartMonitoring}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6b9e14")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#85D615")}
          >
            Iniciar Monitorización
          </Button>
          <Button
            style={{
              backgroundColor: "#FF0000",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginLeft: "10px",
              transition: "background-color 0.3s",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={handleStopMonitoring}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#990000")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF0000")}
          >
            Detener Monitorización
          </Button>
        </Container>
      </Navbar>
    </section>
  );
};

export default DiagnosticMonitor;
