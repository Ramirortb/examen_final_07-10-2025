import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { obtenerPermisos, eliminarPermisos } from "./permisos_service";
import { PermisosForm } from "./permisos_types";
import { ModalPermisos } from "./ModalPermisos";
import Toast from "react-native-toast-message";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi"; 

export const Permisos = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [permisos, setPermisos] = useState<PermisosForm[]>([]);

  const cargarPermisos = async () => {
    try {
      const data = await obtenerPermisos();
      setPermisos(data);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
    }
  };

  useEffect(() => {
    cargarPermisos();
  }, []);

  const confirmarEliminacion = (id: number) => {
    Alert.alert(
      "¿Está seguro?",
      "Esta acción eliminará el permiso seleccionado",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarPermisos(id);
            Toast.show({
              type: "success",
              text1: "Permiso eliminado",
            });
            cargarPermisos();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Permisos</Text>

      <TouchableOpacity
        style={styles.agregarButton}
        onPress={() => setMostrarModal(true)}
      >
        <Text style={styles.agregarButtonText}>Agregar Permiso</Text>
      </TouchableOpacity>

      <FlatList
        data={permisos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.permisoItem}>
            <Text style={styles.permisoText}>Rol: {item.nombre_rol}</Text>
            <Text style={styles.permisoText}>Permisos: {item.permisos}</Text>
            <Text style={styles.permisoText}>
              Fecha: {item.fecha_expiracion}
            </Text>
            <Text style={styles.permisoText}>Usado: {item.usado}</Text>
            <View style={styles.actions}>
             
              <TouchableOpacity onPress={() => setMostrarModal(true)}>
                <Text style={styles.edit}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmarEliminacion(item.id)}>
                <Text style={styles.delete}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {mostrarModal && (
        <ModalPermisos visible={mostrarModal} onClose={() => {
          setMostrarModal(false);
          cargarPermisos();
        }} />
      )}

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1f5f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  agregarButton: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  agregarButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  permisoItem: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  permisoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  actions: {
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



