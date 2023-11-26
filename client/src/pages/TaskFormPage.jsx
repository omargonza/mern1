import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("Title", task.title);
        setValue("Description", task.description);
        setValue("Tecnicos", task.tecnicos);
        setValue("Materiales", task.materiales);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto', // Ajusta este valor según tus necesidades
  maxHeight: '500px', // Ajusta este valor según tus necesidades
  backgroundColor: '#f0f0f0',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px'
}}>
  <Card style={{
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  }}>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Label htmlFor="title" className="font-semibold text-gray-700">Title</Label>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        {...register("title")}
        autoFocus
        className="w-full p-2 border border-gray-300 rounded"
      />
      <p className="text-red-500">{errors.title?.message}</p>

      <Label htmlFor="description" className="font-semibold text-gray-700">Description</Label>
      <Textarea
        name="description"
        id="description"
        rows="3"
        placeholder="Description"
        {...register("description")}
        className="w-full p-2 border border-gray-300 rounded"
      ></Textarea>

      <Label htmlFor="tecnicos" className="font-semibold text-gray-700">Tecnicos</Label>
      <Input
        type="text"
        name="tecnicos"
        placeholder="Tecnicos"
        {...register("tecnicos")}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <p className="text-red-500">{errors.tecnicos?.message}</p>

      <Label htmlFor="materiales" className="font-semibold text-gray-700">Materiales</Label>
      <Input
        type="text"
        name="materiales"
        placeholder="Materiales"
        {...register("materiales")}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <p className="text-red-500">{errors.materiales?.message}</p>

      <Label htmlFor="date" className="font-semibold text-gray-700">Date</Label>
      <Input
        type="date"
        name="date"
        {...register("date")}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <Button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Save</Button>
    </form>
  </Card>
</div>

    
  );
}
