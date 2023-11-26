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
        backgroundColor: "#f0f0f0",
        padding: "16px 0",
        borderBottom: "1px solid #ccc",
      }}
    >
      <div
        className="container nav_container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="mr-2"
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>

        <div className="navbar-nav d-flex align-items-center ">
          {isAuthenticated ? (
            <>
              <li
                className="nav-item mr-2"
                style={{ color: "#007bff", fontWeight: "600" }}
              >
                Bienvenido {user.username}
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-outline-secondary"
                  to="/add-task"
                  style={{
                    color: "#007bff",
                    borderColor: "#007bff",
                    marginRight: "8px",
                  }}
                >
                  Agregar Tarea
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-outline-secondary"
                  to="/"
                  onClick={() => logout()}
                  style={{
                    color: "#007bff",
                    borderColor: "#007bff",
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <ButtonLink
                  className="custom-link btn btn-outline-secondary"
                  to="/login"
                  style={{
                    color: "#007bff",
                    borderColor: "#007bff",
                    marginRight: "8px",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      color: "#007bff !important",
                      textDecoration: "none !important",
                    }}
                  >
                    Iniciar Sesión
                  </span>
                </ButtonLink>
              </li>
              <li className="nav-item">
                <ButtonLink
                  className="custom-link btn btn-outline-secondary"
                  to="/register"
                  style={{
                    color: "#007bff",
                    borderColor: "#007bff",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      color: "#007bff !important",
                      textDecoration: "none !important",
                    }}
                  >
                    Registrar
                  </span>
                </ButtonLink>
              </li>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
