import { useForm } from "react-hook-form";
import { enviarSolicitud } from "./solicitud_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { SolicitudRequest } from "./solicitud_types";

interface Props {
  onClose: () => void;
}

export const ModalSolicitud = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SolicitudRequest>();

  const onSubmit = async (data: SolicitudRequest) => {
    try {
      console.log(data);
      await enviarSolicitud(data);
      toast.success("Solicitud enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar el Solicitud", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar Solicitud</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">solicitud_id:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("solicitud_id", { required: "El Id de solicitud es obligatorio" })}
            />
            {errors.solicitud_id && (
              <p className="text-red-500">{errors.solicitud_id.message}</p>
            )}
          </div>

          
          <div>
            <label className="block font-medium mb-1">Tipo_documento:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("tipo_documento", { required: "El tipo documento es obligatorio" })}
            />
            {errors.tipo_documento && (
              <p className="text-red-500">{errors.tipo_documento.message}</p>
            )}
          </div>




          <div>
            <label className="block font-medium mb-1">Nombre_archivo:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre_archivo", { required: "El nombre archivo es obligatorio" })}
            />
            {errors.nombre_archivo && (
              <p className="text-red-500">{errors.nombre_archivo.message}</p>
            )}
          </div>

            <div>
            <label className="block font-medium mb-1">Url_Archivo:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("url_archivo", { required: "El Url de archivo es obligatorio" })}
            />
            {errors.url_archivo && (
              <p className="text-red-500">{errors.url_archivo.message}</p>
            )}
          </div>

            <div>
            <label className="block font-medium mb-1">Fecha_Carga:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("fecha_carga", { required: "La fecha de carga es obligatorio" })}
            />
            {errors.fecha_carga && (
              <p className="text-red-500">{errors.fecha_carga.message}</p>
            )}
          </div>

           

          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
