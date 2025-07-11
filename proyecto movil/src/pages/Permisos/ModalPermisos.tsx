import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { enviarPermisos } from "./permisos_service";
import type { PermisosRequest } from "./permisos_types";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ModalPermisos = ({ visible, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PermisosRequest>();

  const onSubmit = async (data: PermisosRequest) => {
    try {
      await enviarPermisos(data);
      Toast.show({
        type: "success",
        text1: "Permisos enviado correctamente",
      });
      reset();
      onClose();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error al enviar el permisos",
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Agregar Permisos</Text>

          {/** Nombre Rol */}
          <Controller
            control={control}
            name="nombre_rol"
            rules={{ required: "El nombre del rol es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del rol"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.nombre_rol && <Text style={styles.error}>{errors.nombre_rol.message}</Text>}
              </>
            )}
          />

          {/** Permisos */}
          <Controller
            control={control}
            name="permisos"
            rules={{ required: "Los permisos son obligatorios" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Permisos"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.permisos && <Text style={styles.error}>{errors.permisos.message}</Text>}
              </>
            )}
          />

          {/** Fecha Expiración */}
          <Controller
            control={control}
            name="fecha_expiracion"
            rules={{ required: "La fecha de expiración es obligatoria" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Fecha de expiración (YYYY-MM-DD)"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.fecha_expiracion && (
                  <Text style={styles.error}>{errors.fecha_expiracion.message}</Text>
                )}
              </>
            )}
          />

          {/** Usado */}
          <Controller
            control={control}
            name="usado"
            rules={{ required: "El uso de cuenta es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="¿Usado? (true/false)"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.usado && <Text style={styles.error}>{errors.usado.message}</Text>}
              </>
            )}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#d32f2f",
  },
  save: {
    backgroundColor: "#1976d2",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
