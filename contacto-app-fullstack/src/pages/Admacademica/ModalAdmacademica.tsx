import { useForm } from "react-hook-form";
import { enviarAdmacademica} from "./admacademica_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AdmacademicaRequest } from "./admacademica_types";

interface Props {
  onClose: () => void;
}

export const ModalAdmacademica = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmacademicaRequest>();

  const onSubmit = async (data: AdmacademicaRequest) => {
    try {
      console.log(data);
      await enviarAdmacademica(data);
      toast.success("Administracion Academica enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar Administracion Academica", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar Administracion Academica</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre_programa:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre_programa", { required: "El nombre del programa es obligatorio" })}
            />
            {errors.nombre_programa && (
              <p className="text-red-500">{errors.nombre_programa.message}</p>
            )}
          </div>

          
          <div>
            <label className="block font-medium mb-1">Descripcion:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("descripcion", { required: "La descripcion es obligatorio" })}
            />
            {errors.descripcion && (
              <p className="text-red-500">{errors.descripcion.message}</p>
            )}
          </div>




          <div>
            <label className="block font-medium mb-1">Nivel:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nivel", { required: "El nivel es obligatorio" })}
            />
            {errors.nivel && (
              <p className="text-red-500">{errors.nivel.message}</p>
            )}
          </div>

            

            

           <div>
            <label className="block font-medium mb-1">Duracion:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("duracion", { required: "La duracion es obligatorio" })}
            />
            {errors.duracion && (
              <p className="text-red-500">{errors.duracion.message}</p>
            )}
          </div>
            <div>
            <label className="block font-medium mb-1">Estado_Activo:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("estado_activo", { required: "El estado activo es obligatorio" })}
            />
            {errors.estado_activo && (
              <p className="text-red-500">{errors.estado_activo.message}</p>
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
