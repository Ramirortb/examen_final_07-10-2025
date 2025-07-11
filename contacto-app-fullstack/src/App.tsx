import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoutes";
import { Login } from "./pages/Login/Login";
import { Contacto } from "./pages/Contacto/Contacto";
import { Layout } from "./components/Layout";
import { Mensajes } from "./pages/Mensajes/Mensajes";
import { Notificacion } from "./pages/notificacion/notificacion";
import { Estudiante } from "./pages/Estudiante/estudiante";
import { Calendario } from "./pages/Calendario/calendario";
import { Mensajechat } from "./pages/Mensajechat/mensajechat";
import { Permisos } from "./pages/Permisos/permisos";
import { Admacademica } from "./pages/Admacademica/admacademica";
import { Solicitud } from "./pages/Solicitud/solicitud";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/contacto" />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/mensajes" element={<Mensajes />} />
            <Route path="/notificacion" element={<Notificacion/>}/>
            <Route path="/estudiante" element={<Estudiante />} />
            <Route path="/solicitud" element={<Solicitud />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/mensajechat" element={<Mensajechat />} />
            <Route path="/permisos" element={<Permisos />} />
            <Route path="/admacademica" element={<Admacademica />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
