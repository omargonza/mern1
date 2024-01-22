
import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  filterTasksRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log('Tarea creada exitosamente:', res.data);
      // Puedes mostrar un mensaje al usuario indicando que la tarea se creó con éxito
      alert('Tarea creada exitosamente');
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango de 2xx
        console.log("Datos de error:", error.response.data);
        console.log("Estado de error:", error.response.status);
  
        // Puedes mostrar mensajes específicos según el estado de error
        if (error.response.status === 400) {
          alert('Error: Los datos proporcionados son inválidos. Por favor, verifica los campos.');
        } else {
          alert('Error en el servidor. Por favor, inténtalo de nuevo más tarde.');
        }
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió ninguna respuesta
        console.log("Solicitud de error:", error.request);
        alert('Error de red. Por favor, verifica tu conexión a internet.');
      } else {
        // Algo salió mal en la configuración de la solicitud
        console.log("Error de mensaje:", error.message);
        alert('Error desconocido. Por favor, inténtalo de nuevo.');
      }
    }
  };
  
  

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateTask = async (id, task) => {
    try {
      if (!id) {
        console.error('Error: Se requiere un ID válido para actualizar la tarea.');
        return;
      }
  
      if (!task || Object.keys(task).length === 0) {
        console.error('Error: Se requiere una tarea válida para actualizar.');
        return;
      }
  
      await updateTaskRequest(id, task);
      console.log(`Tarea actualizada con éxito. ID: ${id}`);
    } catch (error) {
      console.error('Error al intentar actualizar la tarea:', error.message);
    }
  };
  
  
  const filterTasks = async () => {
    try {
     // const search = this.state.search; // obtiene el valor del estado search
      const res = await filterTasksRequest(search); // llama a la función filterTasksRequest con el parámetro de búsqueda
      console.log(res.data); // muestra las tareas filtradas
    } catch (error) {
      console.error(error); // o cualquier otra acción que quieras realizar en caso de error
    }
  
  
  };
  


  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
