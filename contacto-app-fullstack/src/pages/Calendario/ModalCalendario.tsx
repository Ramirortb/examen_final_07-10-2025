import { useForm } from "react-hook-form";
import { enviarCalendario } from "./calendario_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { CalendarioRequest } from "./calendario_types";

interface Props {
  onClose: () => void;
}

export const ModalCalendario = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalendarioRequest>();

  const onSubmit = async (data: CalendarioRequest) => {
    try {
      console.log(data);
      await enviarCalendario(data);
      toast.success("Calendario enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar el calendario", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar Calendario</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">tipo_evento:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre_completo", { required: "El tipo de evento es obligatorio" })}
            />
            {errors.tipo_evento && (
              <p className="text-red-500">{errors.tipo_evento.message}</p>
            )}
          </div>

          
            <div>
            <label className="block font-medium mb-1">Fecha_inicio:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("fecha_inicio", { required: "La fecha de inicio es obligatorio" })}
            />
            {errors.fecha_inicio && (
              <p className="text-red-500">{errors.fecha_inicio.message}</p>
            )}
          </div>

           <div>
            <label className="block font-medium mb-1">Fecha_fin:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("fecha_fin", { required: "La fecha de finalizacion es obligatorio" })}
            />
            {errors.fecha_inicio && (
              <p className="text-red-500">{errors.fecha_fin.message}</p>
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
