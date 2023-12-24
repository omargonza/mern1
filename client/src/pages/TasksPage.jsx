import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            maxHeight: "500px",
            backgroundcolor: "#EEEEED",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1
              className="font-bold text-xl"
              style={{
                textAlign: "center",
                color: "#333",
                fontSize: "24px",
                marginTop: "20px",
                fontStyle: "italic",
              }}
            >
              Aún no hay tareas, por favor añade una nueva tarea.
            </h1>
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          alignItems: "start",
          justifyContent: "center",
          padding: "20px",

          backgroundcolor: "#EEEEED",
        }}
      >
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
