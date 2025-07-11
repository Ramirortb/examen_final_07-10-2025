import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";
import { enviarCalendario } from "./calendario_service";
import type { CalendarioRequest } from "./calendario_types";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ModalCalendario = ({ visible, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CalendarioRequest>();

  const onSubmit = async (data: CalendarioRequest) => {
    try {
      await enviarCalendario(data);
      Toast.show({
        type: "success",
        text1: "Calendario enviado correctamente",
      });
      reset();
      onClose();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error al enviar el calendario",
      });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Agregar Calendario</Text>

          <Controller
            name="tipo_evento"
            control={control}
            rules={{ required: "El tipo de evento es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Tipo de evento"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.tipo_evento && (
            <Text style={styles.error}>{errors.tipo_evento.message}</Text>
          )}

          <Controller
            name="fecha_inicio"
            control={control}
            rules={{ required: "La fecha de inicio es obligatoria" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Fecha de inicio (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fecha_inicio && (
            <Text style={styles.error}>{errors.fecha_inicio.message}</Text>
          )}

          <Controller
            name="fecha_fin"
            control={control}
            rules={{ required: "La fecha de finalización es obligatoria" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Fecha de fin (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fecha_fin && (
            <Text style={styles.error}>{errors.fecha_fin.message}</Text>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast />
    </Modal>
  );
};







import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: "#dc2626",
    borderRadius: 8,
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
