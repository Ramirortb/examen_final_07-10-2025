import React from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { SolicitudRequest } from "./solicitud_types";
import { enviarSolicitud } from "./solicitud_service";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ModalSolicitud = ({ visible, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SolicitudRequest>();

  const onSubmit = async (data: SolicitudRequest) => {
    try {
      await enviarSolicitud(data);
      Toast.show({
        type: "success",
        text1: "Solicitud enviada correctamente",
      });
      reset();
      onClose();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error al enviar la solicitud",
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
          <Text style={styles.title}>Agregar Solicitud</Text>

          {/** Campos del formulario */}
          {[
            { name: "solicitud_id", label: "ID Solicitud" },
            { name: "tipo_documento", label: "Tipo de documento" },
            { name: "nombre_archivo", label: "Nombre del archivo" },
            { name: "url_archivo", label: "URL del archivo" },
            { name: "fecha_carga", label: "Fecha de carga (YYYY-MM-DD)" },
          ].map(({ name, label }) => (
            <Controller
              key={name}
              control={control}
              name={name as keyof SolicitudRequest}
              rules={{ required: `El campo ${label} es obligatorio` }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder={label}
                    value={value}
                    onChangeText={onChange}
                  />
                  {errors[name as keyof SolicitudRequest] && (
                    <Text style={styles.error}>
                      {
                        errors[name as keyof SolicitudRequest]?.message as string
                      }
                    </Text>
                  )}
                </>
              )}
            />
          ))}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancel]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={[styles.button, styles.save]}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <Toast />
        </View>
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
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
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: "#d32f2f",
  },
  save: {
    backgroundColor: "#1976d2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
