import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import logo from "../assets/logo.png";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  return (
    <nav
      style={{
        backgroundColor: "#85D615",
        padding: "15px 0",
        borderBottom: "1px solid #1a2224",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{ padding: "0 16px" }}
      >
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="mr-2"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
          <h1
            style={{
              color: "#585857",
              fontWeight: "800",
              textDecoration: "none",
              fontSize: "1.5rem",
              margin: 0,
            }}
          >
            Mantenimiento Electrico
          </h1>
        </div>

        <div className="navbar-nav d-flex align-items-center">
          {isAuthenticated ? (
            <>
              <span
                style={{
                
                  margin: "15px",
                  display: "inline-block", // Alinea el texto en un bloque
                  fontSize: "1.2rem", // Tamaño de la fuente
                  fontWeight: "bold", // Peso de la fuente
                  color: "#585857", // Color del texto
                  textTransform: "capitalize", // Capitaliza la primera letra de cada palabra
                  fontStyle: "italic", // Estilo de la fuente
                }}
              >
                ¡Bienvenido, {user.username}!
              </span>

              <ButtonLink to="https://electric-2r3p.onrender.com/add-task">Agregar Tarea</ButtonLink>
              <ButtonLink
            to={isAuthenticated ? "https://electric-2r3p.onrender.com/tasks" : "https://electric-2r3p.onrender.com/task"}
            style={{ marginRight: "5px" }}
          >
            Tareas
          </ButtonLink>
             
            </>
          ) : (
            <>
              <ButtonLink to="https://electric-2r3p.onrender.com/login">Iniciar Sesión</ButtonLink>
              <ButtonLink to="https://electric-2r3p.onrender.com/register">Registrar</ButtonLink>
            </>
          )}
           <Link  style={{ textDecoration:"none", color: "#585857", borderColor: "#007bff", marginRight: '10px' }}
            onClick={() => logout()}>Logout</Link>

         
        </div>
      </div>
    </nav>
  );
}

