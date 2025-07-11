import { useForm } from "react-hook-form";
import { enviarPermisos } from "./permisos_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { PermisosRequest } from "./permisos_types";

interface Props {
  onClose: () => void;
}

export const ModalPermisos = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PermisosRequest>();

  const onSubmit = async (data: PermisosRequest) => {
    try {
      console.log(data);
      await enviarPermisos(data);
      toast.success("Permisos enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar el permisos", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar Permisos</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre_Rol:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre_rol", { required: "El nombre del rol es obligatorio" })}
            />
            {errors.nombre_rol && (
              <p className="text-red-500">{errors.nombre_rol.message}</p>
            )}
          </div>

          

          <div>
            <label className="block font-medium mb-1">Permisos:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("permisos", { required: "La contraseña es obligatorio" })}
            />
            {errors.permisos && (
              <p className="text-red-500">{errors.permisos.message}</p>
            )}
          </div>


            

            <div>
            <label className="block font-medium mb-1">Fecha_expiracion:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("fecha_expiracion", { required: "La fecha de expiracion es obligatorio" })}
            />
            {errors.fecha_expiracion && (
              <p className="text-red-500">{errors.fecha_expiracion.message}</p>
            )}
          </div>

           <div>
            <label className="block font-medium mb-1">Usado:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("usado", { required: "El uso de cuenta es obligatorio" })}
            />
            {errors.usado && (
              <p className="text-red-500">{errors.usado.message}</p>
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