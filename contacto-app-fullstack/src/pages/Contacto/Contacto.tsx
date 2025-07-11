import "react-toastify/dist/ReactToastify.css";
import type { ContactoForm } from "./contacto.types";
import { useEffect, useState } from "react";
import { ModalContacto } from "./ModalContacto";
import { FiPlus } from "react-icons/fi";
import { obtenerContactos } from "./contacto.service";
import { ToastContainer } from "react-toastify";

export const Contacto = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [contacto, setContacto] = useState<ContactoForm[]>([]);

  const cargarMensajes = async () => {
    try {
      const data = await obtenerContactos();
      setContacto(data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarMensajes(); // refresca la lista después de cerrar el modal
  };

  const formatoFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);

    // Obtener valores UTC para evitar desfase
    const dia = String(fecha.getUTCDate()).padStart(2, "0");
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
    const anio = fecha.getUTCFullYear();

    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Contactos
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
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Nombre</th>
              <th className="text-left px-4 py-2">Correo</th>
              <th className="text-left px-4 py-2">Mensaje</th>
              <th className="text-left px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {contacto.map((m) => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{m.id}</td>
                <td className="px-4 py-2">{m.nombre}</td>
                <td className="px-4 py-2">{m.correo}</td>
                <td className="px-4 py-2">{m.mensaje}</td>
                <td className="px-4 py-2">{formatoFecha(m.fecha)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && <ModalContacto onClose={cerrarModal} />}
      <ToastContainer />
    </div>
  );
};
