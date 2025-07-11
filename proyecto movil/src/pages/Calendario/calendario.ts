import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
import { obtenerCalendario, eliminarCalendario } from "./calendario_service";
import { CalendarioForm } from "./calendario_types";
import { ModalCalendario } from "./ModalCalendario";

export const Calendario = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [calendario, setCalendario] = useState<CalendarioForm[]>([]);

  const cargarCalendario = async () => {
    try {
      const data = await obtenerCalendario();
      setCalendario(data);
    } catch (error) {
      console.error("Error al obtener calendarios:", error);
    }
  };

  const confirmarEliminacion = (id: number) => {
    Alert.alert("¿Está seguro de eliminar?", "Esta acción no se puede deshacer", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Aceptar",
        onPress: async () => {
          await eliminarCalendario(id);
          Toast.show({
            type: "success",
            text1: "Calendario eliminado",
          });
          cargarCalendario();
        },
      },
    ]);
  };

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarCalendario();
  };

  useEffect(() => {
    cargarCalendario();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendario</Text>
        <TouchableOpacity style={styles.addButton} onPress={abrirModal}>
          <Icon name="plus" size={20} color="#fff" />
          <Text style={styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={calendario}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemText}>{item.tipo_evento}</Text>
              <Text style={styles.itemText}>Inicio: {item.fecha_inicio}</Text>
              <Text style={styles.itemText}>Fin: {item.fecha_fin}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={abrirModal}>
                <Icon name="edit" size={20} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarEliminacion(item.id)}>
                <Icon name="trash-2" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {mostrarModal && <ModalCalendario onClose={cerrarModal} />}

      <Toast />
    </View>
  );
};



import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemInfo: {
    flex: 1,
    gap: 4,
  },
  itemText: {
    color: "#374151",
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
});
