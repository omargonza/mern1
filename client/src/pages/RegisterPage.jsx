import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

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
        {registerErrors.map((error, i) => (
          <Message style={{color: 'red'}} message={error} key={i} />
        ))}
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#007bff',
          marginBottom: '16px'
        }}>Registrarse</h1>
    
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="username" className="font-semibold text-gray-700">Usuario:</Label>
          <Input
            type="text"
            name="username"
            placeholder="Write your name"
            {...register("username")}
            autoFocus
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-red-500">{errors.username?.message}</p>
    
          <Label htmlFor="email" className="font-semibold text-gray-700">Email:</Label>
          <Input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-red-500">{errors.email?.message}</p>
    
          <Label htmlFor="password" className="font-semibold text-gray-700">Contrasena:</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-red-500">{errors.password?.message}</p>
    
          <Label htmlFor="confirmPassword" className="font-semibold text-gray-700">Confirmar Contrasena:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
    
          <Button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar</Button>
        </form>
    
        <p className="flex gap-x-2 justify-between mt-4 text-sm text-gray-600">
          Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
        </p>
      </Card>
    </div>
    
  );
}

export default Register;
