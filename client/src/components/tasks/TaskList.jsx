import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";

export function FilterTasks({ task }) {
  const { tasks, filterTasks } = useTasks();
  const filteredTasks = filterTasks(task);

  return (
    <div>
    {filteredTasks.map((task) => (
      <div key={task._id}>
        <h3>{task.title}</h3>
        <p>Description: {task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        {task.assignedTo && <p>Assigned To: {task.assignedTo}</p>}
        {task.status && <p>Status: {task.status}</p>}
  
        <Button onClick={() => {
          task.status = task.status === 'completed' ? 'in progress' : 'completed';
          filteredTasks([...filteredTasks]);
        }}>
          Mark as Complete
        </Button>
  
      </div>
    ))}
  </div>
  );
}