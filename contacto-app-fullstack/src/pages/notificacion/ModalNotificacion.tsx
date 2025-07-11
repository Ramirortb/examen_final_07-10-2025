import { useForm } from "react-hook-form";
import { enviarNotificacion } from "./notificacion_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { NotificacionRequest } from "./notificacion_types";

interface Props {
  onClose: () => void;
}

export const ModalNotificacion = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificacionRequest>();

  const onSubmit = async (data: NotificacionRequest) => {
    try {
      console.log(data);
      await enviarNotificacion(data);
      toast.success("Mensaje enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar el mensaje", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar mensaje</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">usuario_id:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("usuario_id", { required: "El nombre es obligatorio" })}
            />
            {errors.usuario_id && (
              <p className="text-red-500">{errors.usuario_id.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Tipo:
            </label>
            <input
              type="tipos"
              className="w-full px-3 py-2 border rounded-xl"
              {...register("tipo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.tipo && (
              <p className="text-red-500">{errors.tipo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Titulo:</label>
            <textarea
              className="w-full px-3 py--2 border rounded-xl"
              rows={4}
              {...register("titulo", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.titulo && (
              <p className="text-red-500">{errors.titulo.message}</p>
            )}
          </div>

            <div>
            <label className="block font-medium mb-1">mensaje:</label>
            <textarea
              className="w-full px-3 py--2 border rounded-xl"
              rows={4}
              {...register("mensaje", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500">{errors.mensaje.message}</p>
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
