
/*
import React, { useEffect, useState } from "react";
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

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    console.log('onSubmit se está ejecutando...');

    try {
      if (params.id) {
        // Si es una actualización, esperar a que se complete la operación
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        // Si es una creación, esperar a que se complete la operación
        // Imprimir la fecha original
        console.log('Fecha original:', data.date);
      
        // Formatear la fecha con dayjs
        const fechaFormateada = dayjs.utc(data.date).format();
      
        // Imprimir la fecha después de aplicar el formato
        console.log('Fecha después de formatear:', fechaFormateada);
      
        // Enviar la tarea con la fecha formateada y esperar a que se complete la operación
        await createTask({
          ...data,
          date: fechaFormateada,
        });
      }

      // Limpiar el mensaje de error si la operación se completa exitosamente
      setErrorMessage(null);

      // Navegar después de que la operación se haya completado exitosamente
      navigate("/tasks");
    } catch (error) {
      // Manejar errores si ocurren durante la operación
      console.error('Error al procesar la tarea:', error.message);

      // Establecer el mensaje de error para mostrar al usuario
      setErrorMessage('Hubo un error al procesar la tarea. Verifica los datos y vuelve a intentarlo.');

      // Puedes hacer más cosas aquí, como mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        try {
          const task = await getTask(params.id);
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("tecnicos", task.tecnicos);
          setValue("materiales", task.materiales);
          setValue(
            "date",
            task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
          );
          setValue("completed", task.completed);

          // Limpiar el mensaje de error si la carga de tarea se completa exitosamente
          setErrorMessage(null);
        } catch (error) {
          // Manejar errores si ocurren durante la carga de la tarea
          console.error('Error al cargar la tarea:', error.message);

          // Establecer el mensaje de error para mostrar al usuario
          setErrorMessage('Hubo un error al cargar la tarea. Vuelve a intentarlo más tarde.');

          // Puedes hacer más cosas aquí, como mostrar un mensaje de error al usuario
        }
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  return (
    <Card>
  
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}

        <Label htmlFor="tecnicos">Tecnicos</Label>
        <Input
          type="text"
          name="tecnicos"
          placeholder="Tecnicos"
          {...register("tecnicos")}
        />
        {errors.tecnicos && (
          <p className="text-red-500 text-xs italic">
            {errors.tecnicos.message}
          </p>
        )}

        <Label htmlFor="materiales">Materiales</Label>
        <Input
          type="text"
          name="materiales"
          placeholder="Materiales"
          {...register("materiales")}
        />
        {errors.materiales && (
          <p className="text-red-500 text-xs italic">
            {errors.materiales.message}
          </p>
        )}

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        {errors.date && (
          <p className="text-red-500 text-xs italic">{errors.date.message}</p>
        )}

        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}
*/
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";

import utc from "dayjs/plugin/utc";
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

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    console.log('onSubmit se está ejecutando...');

    try {
      if (params.id) {
        // Si es una actualización, esperar a que se complete la operación
        await updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).toDate(), // Utiliza toDate() para obtener el objeto de fecha original
        });
      } else {
        // Si es una creación, esperar a que se complete la operación
        // Imprimir la fecha original
        console.log('Fecha original:', data.date);
      
        // Enviar la tarea con la fecha original y esperar a que se complete la operación
        await createTask({
          ...data,
          date: dayjs.utc(data.date).format(),// date: dayjs.utc(data.date).toDate(), // Utiliza toDate() para obtener el objeto de fecha original
        });
      }

      // Limpiar el mensaje de error si la operación se completa exitosamente
      setErrorMessage(null);

      // Navegar después de que la operación se haya completado exitosamente
      navigate("/tasks");
    } catch (error) {
      // Manejar errores si ocurren durante la operación
      console.error('Error al procesar la tarea:', error.message);

      // Establecer el mensaje de error para mostrar al usuario
      setErrorMessage('Hubo un error al procesar la tarea. Verifica los datos y vuelve a intentarlo.');

      // Puedes hacer más cosas aquí, como mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        try {
          const task = await getTask(params.id);
          setValue("title", task.title);
          setValue("description", task.description);
          setValue("tecnicos", task.tecnicos);
          setValue("materiales", task.materiales);
          setValue(
            "date",
            task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
          );
          setValue("completed", task.completed);

          // Limpiar el mensaje de error si la carga de tarea se completa exitosamente
          setErrorMessage(null);
        } catch (error) {
          // Manejar errores si ocurren durante la carga de la tarea
          console.error('Error al cargar la tarea:', error.message);

          // Establecer el mensaje de error para mostrar al usuario
          setErrorMessage('Hubo un error al cargar la tarea. Vuelve a intentarlo más tarde.');

          // Puedes hacer más cosas aquí, como mostrar un mensaje de error al usuario
        }
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}

        <Label htmlFor="tecnicos">Tecnicos</Label>
        <Input
          type="text"
          name="tecnicos"
          placeholder="Tecnicos"
          {...register("tecnicos")}
        />
        {errors.tecnicos && (
          <p className="text-red-500 text-xs italic">
            {errors.tecnicos.message}
          </p>
        )}

        <Label htmlFor="materiales">Materiales</Label>
        <Input
          type="text"
          name="materiales"
          placeholder="Materiales"
          {...register("materiales")}
        />
        {errors.materiales && (
          <p className="text-red-500 text-xs italic">
            {errors.materiales.message}
          </p>
        )}

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        {errors.date && (
          <p className="text-red-500 text-xs italic">{errors.date.message}</p>
        )}

        {errorMessage && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}

        <Button type="submit">Save</Button>
      </form>
    </Card>
  );
}
