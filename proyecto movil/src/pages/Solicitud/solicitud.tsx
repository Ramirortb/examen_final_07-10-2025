import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import { ModalSolicitud } from "./ModalSolicitud";
import {
  obtenersolicitud,
  eliminarsolicitud,
} from "./solicitud_service";
import { SolicitudForm } from "./solicitud_types";

export const Solicitud = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [solicitudes, setSolicitudes] = useState<SolicitudForm[]>([]);

  const cargarsolicitud = async () => {
    try {
      const data = await obtenersolicitud();
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al obtener la solicitud:", error);
    }
  };

  useEffect(() => {
    cargarsolicitud();
  }, []);

  const confirmarEliminacion = (id: number) => {
    Alert.alert(
      "¿Estás seguro?",
      "Esta acción eliminará la solicitud.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarsolicitud(id);
            Toast.show({
              type: "success",
              text1: "Solicitud eliminada correctamente",
            });
            cargarsolicitud();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes</Text>

      <TouchableOpacity
        style={styles.agregarBtn}
        onPress={() => setMostrarModal(true)}
      >
        <Text style={styles.agregarBtnText}>Agregar Solicitud</Text>
      </TouchableOpacity>

      <FlatList
        data={solicitudes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>ID: {item.solicitud_id}</Text>
            <Text>Documento: {item.tipo_documento}</Text>
            <Text>Archivo: {item.nombre_archivo}</Text>
            <Text>URL: {item.url_archivo}</Text>
            <Text>Fecha: {item.fecha_carga}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => setMostrarModal(true)} 
              >
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmarEliminacion(item.id)}
              >
                <Text style={styles.delete}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {mostrarModal && (
        <ModalSolicitud
          visible={mostrarModal}
          onClose={() => {
            setMostrarModal(false);
            cargarsolicitud();
          }}
        />
      )}

      <Toast />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  agregarBtn: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  agregarBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  edit: {
    color: "#2563eb",
    fontWeight: "600",
  },
  delete: {
    color: "#dc2626",
    fontWeight: "600",
  },
});
