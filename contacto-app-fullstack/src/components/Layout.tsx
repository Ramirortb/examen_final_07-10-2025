import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { Estudiante } from "../pages/Estudiante/estudiante";
import { Permisos } from "../pages/Permisos/permisos";
import { Calendario } from "../pages/Calendario/calendario";

export const Layout = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <h1 className="text-xl font-bold">Sistema de Contactos</h1>

          <div className="flex gap-6 items-center">
            <Link to="/contacto" className="hover:text-blue-300 transition">
              Contactos
            </Link>
            <Link to="/mensajes" className="hover:text-blue-300 transition">
              Mensajes
            </Link>
            <Link to="/notificacion" className="hover:text-blue-300 transition">
              Notificacion
            </Link>
            <Link to="/estudiante" className="hover:text-blue-300 transition">
              Estudiante
            </Link>
            <Link to="/solicitud" className="hover:text-blue-300 transition">
              Solicitud
            </Link>
            <Link to="/mensajechat" className="hover:text-blue-300 transition">
              Mensajes Chat
            </Link>
            <Link to="/calendario" className="hover:text-blue-300 transition">
              Calendario
            </Link>
            <Link to="/permisos" className="hover:text-blue-300 transition">
              Permisos
            </Link>
            <Link to="/admacademica" className="hover:text-blue-300 transition">
              Academico
            </Link>

          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm sm:text-base font-medium">
              {usuario?.nombre}
            </span>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-300 text-lg"
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
