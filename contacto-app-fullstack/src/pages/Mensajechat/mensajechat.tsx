
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { ModalMensajechat} from "./ModalMensajechat";
import { obtenermensajechat, eliminarMensajechat } from "./mensajechat_service";
import type { MensajechatForm } from "./mensajechat_types";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";



export const Mensajechat = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [Mensajechat, setMensajechat] = useState<MensajechatForm[]>([]);
  

  const cargarmensajechat = async () => {
    try {
      const data = await obtenermensajechat();
      setMensajechat(data);
    } catch (error) {
      console.error("Error al obtener los mensaje chats:", error);
    }
  };

  useEffect(() => {
    cargarmensajechat();
  }, []);

  const abrirModal = () => setMostrarModal(true);
      
    const cerrarModal = () => {
    setMostrarModal(false);
    cargarmensajechat(); // refresca la lista después de cerrar el modal
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
          await eliminarMensajechat(id);
          toast.success("Mensaje chat eliminado", {
            position: "top-right",
            autoClose: 1000,
          });
          cargarmensajechat();
        }
      };
      useEffect(() => {
    cargarmensajechat();
  }, []);



  return (
    <div className="max-w-4xl mx-auto px-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Mensajechat
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
              <th className="text-left px-4 py-2">Id</th>
              <th className="text-left px-4 py-2">Remitente</th>
              <th className="text-left px-4 py-2">Destinatario</th>
              <th className="text-left px-4 py-2">Mensaje</th>
              
            </tr>
          </thead>
          <tbody>
            {Mensajechat.map((m) => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{m.id}</td>
                <td className="px-4 py-2">{m.remitente_id}</td>
                <td className="px-4 py-2">{m.destinatario_id}</td>
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

      {mostrarModal && <ModalMensajechat onClose={cerrarModal} />}
        
      <ToastContainer />
    </div>
  );
};
