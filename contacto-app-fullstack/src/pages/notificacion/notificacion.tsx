import "react-toastify/dist/ReactToastify.css";
import type { NotificacionForm } from "./notificacion_types";
import { useEffect, useState } from "react";
import { ModalNotificacion} from "./ModalNotificacion";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { eliminarnotificacion, obtenerNotificacion } from "./notificacion_service";
//import { ToastContainer } from "react-toastify";
//import { ModalContacto } from "../Contacto/ModalContacto";
//import { ModalMensaje } from "../Mensajes/ModalMensajes";
//import { ModalContacto } from "../Contacto/ModalContacto";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
//import { ModalContacto } from "../Contacto/ModalContacto";

export const Notificacion = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [Notificacion, setNotificacion] = useState<NotificacionForm[]>([]);

  const cargarnotificacion = async () => {
    try {
      const data = await obtenerNotificacion();
      setNotificacion(data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  useEffect(() => {
    cargarnotificacion();
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarnotificacion(); // refresca la lista después de cerrar el modal
  };

  {/*const formatoFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);

    // Obtener valores UTC para evitar desfase
    const dia = String(fecha.getUTCDate()).padStart(2, "0");
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
    const anio = fecha.getUTCFullYear();

    return `${dia}/${mes}/${anio}`;
  };*/}

    const confirmarEliminacion = async (id: number) => {
            const result = await Swal.fire({
              title: "¿Está seguro de eliminar?",
              //text: "No podrá revertir esta acción",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Aceptar",
              cancelButtonText: "Cancelar",
              //width: "500px",
            });
        
            if (result.isConfirmed) {
              await eliminarnotificacion(id);
              toast.success("Notificacion eliminado", {
                position: "top-right",
                autoClose: 1000,
              });
              cargarnotificacion();
            }
          };
          useEffect(() => {
        cargarnotificacion();
      }, []);










  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Notificacion
        </h2>
        <button
          onClick={abrirModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <FiPlus className="text-lg" />
          <span className="text-sm sm:text-base">Agregar</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border bg-white border-gray-300 mt-4 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">id</th>
              <th className="text-left px-4 py-2">usuario_id</th>
              <th className="text-left px-4 py-2">tipo</th>
              <th className="text-left px-4 py-2">titulo</th>
              <th className="text-left px-4 py-2">mensaje</th>
            </tr>
          </thead>
          <tbody>
            {Notificacion.map((m) => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{m.id}</td>
                <td className="px-4 py-2">{m.usuario_id}</td>
                <td className="px-4 py-2">{m.tipo}</td>
                <td className="px-4 py-2">{m.titulo}</td>
                <td className="px-4 py-2">{m.mensaje}</td>

                <button
                    onClick={() => abrirModal(m)}
                    className="text-blue-600 hover:text-blue-800"
                 >
                    <FiEdit />
                 </button>
                 <button
                      onClick={() => confirmarEliminacion(m.id)}
                      className="text-red-600 hover:text-red-800"
                  >
                      <FiTrash2 />
                  </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && <ModalNotificacion onClose={cerrarModal} />}
      <ToastContainer />
    </div>
  );
};
