import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../public/style.css";

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
        backgroundColor: "#00000",
      }}
    >
      <Card
        style={{
          backgroundColor: "#2b2c2e", // Color de fondo más sobrio
          maxWidth: "400px", // Ancho máximo del contenedor
          width: "100%", // Ancho completo del contenedor
          padding: "20px", // Espaciado interno
          borderRadius: "8px", // Bordes redondeados
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra 3D
          boxSizing: "border-box", // Incluye el padding en el ancho y alto
          margin: "0 auto", // Centra el contenedor horizontalmente
          overflow: "hidden", // Evita que el contenido desborde
        }}
      >
        {registerErrors.map((error, i) => (
          <Message style={{ color: "red" }} message={error} key={i} />
        ))}
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#585857",
            marginBottom: "16px",
          }}
        >
          Register
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            color: "darkgrey",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "100%", // Ajusta el ancho según sea necesario
          }}
        >
          <label
            htmlFor="username"
            style={{
              fontWeight: "600",
              color: "#585857",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Write your name"
            {...register("username")}
            autoFocus
            style={{
              width: "90%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          />
          {errors.username?.message && (
            <p style={{ color: "red" }}>{errors.username?.message}</p>
          )}

          <label
            htmlFor="email"
            style={{
              fontWeight: "600",
              color: "#585857",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Email:
          </label>
          <input
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
            style={{
              width: "90%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <label
            htmlFor="password"
            style={{
              fontWeight: "600",
              color: "#585857",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            {...register("password")}
            style={{
              width: "90%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <label
            htmlFor="confirmPassword"
            style={{
              fontWeight: "600",
              color: "#585857",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="********"
            {...register("confirmPassword")}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}
          <Button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF", // Color de fondo
              color: "#fff", // Color del texto
              borderRadius: "4px", // Bordes redondeados
              border: "none", // Sin borde
              cursor: "pointer", // Cursor de puntero al pasar el mouse
            }}
          >
            Submit
          </Button>
        </form>
        <p className="mt-4 text-gray-600">
          ¿Ya tenés una cuenta, che?
          <Link className="text-blue-500 ml-1" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
