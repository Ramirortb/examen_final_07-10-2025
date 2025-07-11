import { useForm } from "react-hook-form";
import { enviarMensajechat } from "./mensajechat_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { MensajechatRequest } from "./mensajechat_types";

interface Props {
  onClose: () => void;
}

export const ModalMensajechat = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MensajechatRequest>();

  const onSubmit = async (data: MensajechatRequest) => {
    try {
      console.log(data);
      await enviarMensajechat(data);
      toast.success("Mensajechat enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar el mensajechat", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar Mensaje chat</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Remitente:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("remitente_id", { required: "El remitente es obligatorio" })}
            />
            {errors.remitente_id && (
              <p className="text-red-500">{errors.remitente_id.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Destinatario:
            </label>
            <input
              type="destinatario"
              className="w-full px-3 py-2 border rounded-xl"
              {...register("destinatario", {
                required: "El destinatario es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Destinatario no válido",
                },
              })}
            />
            {errors.destinatario && (
              <p className="text-red-500">{errors.destinatario.message}</p>
            )}
          </div>



          <div>
            <label className="block font-medium mb-1">Mensaje:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("mensaje", { required: "El mensaje es obligatorio" })}
            />
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
