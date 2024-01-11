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
      console.log(res.data);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango de 2xx
        console.log("Datos de error:", error.response.data);
        console.log("Estado de error:", error.response.status);
        console.log("Encabezados de error:", error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió ninguna respuesta
        console.log("Solicitud de error:", error.request);
      } else {
        // Algo sucedió en la configuración de la solicitud que desencadenó un error
        console.log("Error de mensaje:", error.message);
      }
      console.log("Configuración de error:", error.config);
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
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error);
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
