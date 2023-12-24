import { Link } from "react-router-dom";
/*
function HomePage() {
  return (
    <section className="bg-red-500 flex justify-center items-center">
     <header className="bg-slate-400 p-10">
      <h1 className="text-5xl py-2 font-bold text-gray-500">Gestión de Tareas</h1>
        <p className="text-md text-gray-500">
          Esta aplicación ha sido diseñada para registrar eficientemente las
          tareas del sector eléctrico de los trabajadores del Sutpa. Permite a
          los trabajadores documentar y supervisar sus actividades diarias,
          desde la resolución de problemas eléctricos hasta la implementación de
          medidas preventivas. Con características intuitivas y herramientas
          especializadas, la aplicación proporciona una plataforma centralizada
          para gestionar, asignar y dar seguimiento a las tareas, mejorando así
          la eficiencia y la coordinación en el equipo.
        </p>

        <Link
          className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Comenzar
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
*/
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function HomePage() {
  return (
    <section className="bg-red-500 flex justify-center items-center">
      <Navbar className="bg-slate-400 p-10">
        <Container>
          <Navbar.Brand>
            <h1 className="text-5xl py-2 font-bold text-gray-500">
              Gestión de Tareas
            </h1>
          </Navbar.Brand>
          <p className="text-md text-gray-500">
            Esta aplicación ha sido diseñada para registrar eficientemente las
            tareas del sector eléctrico de los trabajadores del Sutpa. Permite a
            los trabajadores documentar y supervisar sus actividades diarias,
            desde la resolución de problemas eléctricos hasta la implementación
            de medidas preventivas. Con características intuitivas y
            herramientas especializadas, la aplicación proporciona una
            plataforma centralizada para gestionar, asignar y dar seguimiento a
            las tareas, mejorando así la eficiencia y la coordinación en el
            equipo.
          </p>
          <Button
            style={{
              backgroundColor: "#85D615",
              color: "darkgrey",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              transition: "background-color 0.3s",
              textDecoration: "none",
              cursor: "pointer", // Cambia el cursor al pasar sobre el botón
            }}
            href="/register"
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6b9e14")} // Color de fondo al pasar el ratón
            onMouseOut={(e) => (e.target.style.backgroundColor = "#85D615")} // Restaura el color de fondo al salir el ratón
          >
            Comenzar
          </Button>
        </Container>
      </Navbar>
    </section>
  );
}

export default HomePage;
