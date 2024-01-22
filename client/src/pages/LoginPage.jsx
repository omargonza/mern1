import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label, ButtonLink } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import "../../public/style.css"

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  return (
<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 100px)',
  backgroundColor: '#00000'
}}>
  <Card style={{
    backgroundColor: '#2b2c2e', // Color de fondo más sobrio
    maxWidth: '400px', // Ancho máximo del contenedor
    width: '100%', // Ancho completo del contenedor
    padding: '20px', // Espaciado interno
    borderRadius: '8px', // Bordes redondeados
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra 3D
    boxSizing: 'border-box', // Incluye el padding en el ancho y alto
    margin: '0 auto', // Centra el contenedor horizontalmente
    overflow: 'hidden', // Evita que el contenido desborde
}}>
    {loginErrors.map((error, i) => (
      <Message style={{color: 'red'}} message={error} key={i} />
    ))}
    <h1 style={{
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#585857',
      marginBottom: '16px'
    }}>Login</h1>

    <form onSubmit={handleSubmit(onSubmit)} style={{
        Color: 'darkgrey',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
      <Label htmlFor="email" style={{fontWeight: '600', color: '#585857'}}>Email:</Label>
      <Input
        label="Write your email"
        type="email"
        name="email"
        placeholder="youremail@domain.tld"
        {...register("email", { required: true })}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <p style={{color: 'red'}}>{errors.email?.message}</p>

      <Label htmlFor="password" style={{fontWeight: '600', color: '#585857'}}>Password:</Label>
      <Input
        type="password"
        name="password"
        placeholder="Write your password"
        {...register("password", { required: true, minLength: 6 })}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <p style={{color: 'red'}}>{errors.password?.message}</p>

      <Button>Login</Button>
    </form>

    <p style={{
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#585857'
    }}>
     ¿No tienes una cuenta? <Link to="/register" style={{color: '#585857'}}>Sign up</Link>
    </p>
  </Card>
</div>

  );
}
