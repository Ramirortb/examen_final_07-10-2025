import { useForm } from "react-hook-form";
import { enviarEstudiante } from "./estudiante_service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { EstudianteRequest } from "./estudiante_types";

interface Props {
  onClose: () => void;
}

export const ModalEstudiante = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EstudianteRequest>();

  const onSubmit = async (data: EstudianteRequest) => {
    try {
      console.log(data);
      await enviarEstudiante(data);
      toast.success("Estudiante enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
      onClose();
    } catch (err) {
      toast.error("Error al enviar el estudiante", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Agregar Estudiante</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre_Completo:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre_completo", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre_completo && (
              <p className="text-red-500">{errors.nombre_completo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Correo:
            </label>
            <input
              type="correo"
              className="w-full px-3 py-2 border rounded-xl"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.correo && (
              <p className="text-red-500">{errors.correo.message}</p>
            )}
          </div>



          <div>
            <label className="block font-medium mb-1">Contraseña:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("contraseña", { required: "La contraseña es obligatorio" })}
            />
            {errors.contraseña && (
              <p className="text-red-500">{errors.contraseña.message}</p>
            )}
          </div>




          <div>
            <label className="block font-medium mb-1">Tipo_Usuario:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("tipo_usuario", { required: "El tipo de usuario es obligatorio" })}
            />
            {errors.tipo_usuario && (
              <p className="text-red-500">{errors.tipo_usuario.message}</p>
            )}
          </div>

            

            <div>
            <label className="block font-medium mb-1">Fecha_Registro:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("fecha_registro", { required: "La fecha de registro es obligatorio" })}
            />
            {errors.fecha_registro && (
              <p className="text-red-500">{errors.fecha_registro.message}</p>
            )}
          </div>

           <div>
            <label className="block font-medium mb-1">Estado_Cuenta:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("estado_cuenta", { required: "El estado de cuenta es obligatorio" })}
            />
            {errors.estado_cuenta && (
              <p className="text-red-500">{errors.estado_cuenta.message}</p>
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
