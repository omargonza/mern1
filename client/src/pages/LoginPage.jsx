import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

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
    backgroundColor: '#f0f0f0',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  }}>
    {loginErrors.map((error, i) => (
      <Message style={{color: 'red'}} message={error} key={i} />
    ))}
    <h1 style={{
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: '16px'
    }}>Login</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="email" style={{fontWeight: '600', color: '#333'}}>Email:</Label>
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

      <Label htmlFor="password" style={{fontWeight: '600', color: '#333'}}>Password:</Label>
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

      <Button style={{
        width: '100%',
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '8px'
      }}>Login</Button>
    </form>

    <p style={{
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#666'
    }}>
      Don't have an account? <Link to="/register" style={{color: '#007bff'}}>Sign up</Link>
    </p>
  </Card>
</div>

  );
}
