import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import "../../../public/style.css";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <Card className="custom-card">
      <header
        className="grid grid-cols-2 gap-4 p-4 bg-gray-200 border-b border-gray-800 shadow-md"
        style={{
          backgroundColor: "darkgrey",

          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div>
          <h3 className="text-3xl font-bold text-gray-800">{task.title}</h3>
          <span></span>
        </div>
        <div className="flex flex-col text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <h5 className="text-sm">Descripción:</h5>
              <p className="text-sm">{task.description}</p>
            </div>
            <div>
              <h5 className="text-sm">Materiales:</h5>
              <p className="text-sm">{task.materiales}</p>
            </div>
            <div>
              <div className="col-span-2">
                <h5 className="text-sm">Tecnicos:</h5>
                <p className="text-sm">{task.tecnicos}</p>
              </div>
              
              <h5 className="text-sm">Fecha:</h5>
              <p className="text-sm">
                {task.date && (
                  <>
                    <span>
                      {new Date(task.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </span>
                    <span>
                      {new Date(task.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </>
                )}
              </p>
              
            </div>
          </div>
        </div>
      </header>

      <div className="my-div">
        <buttonStyle onClick={() => deleteTask(task._id)} className="delete-button">
          Borrar
        </buttonStyle>

        <buttonStyle
          className="edit-button"
          onClick={() => {
            window.location.href = `/tasks/${task._id}`;
          }}
        >
          Editar
        </buttonStyle>
      </div>
    </Card>
  );
}
