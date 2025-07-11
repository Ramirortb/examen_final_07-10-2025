import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { obtenerestudiante, eliminarEstudiante } from './estudiante_service';
import type { EstudianteForm } from './estudiante_types';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import ModalEstudiante from './ModalEstudiante';

export const EstudianteScreen: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<EstudianteForm[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarEstudiantes = async () => {
    try {
      const data = await obtenerestudiante();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error al obtener los estudiantes:', error);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const confirmarEliminacion = (id: number) => {
    Alert.alert(
      '¿Está seguro de eliminar?',
      '',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            await eliminarEstudiante(id);
            Toast.show({
              type: 'success',
              text1: 'Estudiante eliminado',
            });
            cargarEstudiantes();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: EstudianteForm }) => (
    <View style={styles.card}>
      <Text style={styles.label}>📌 ID: {item.id}</Text>
      <Text>👤 Nombre: {item.nombre_completo}</Text>
      <Text>📧 Correo: {item.correo}</Text>
      <Text>🔐 Contraseña: {item.contraseña}</Text>
      <Text>🧩 Tipo Usuario: {item.tipo_usuario}</Text>
      <Text>📅 Registro: {item.fecha_registro}</Text>
      <Text>✅ Estado: {item.estado_cuenta}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setMostrarModal(true)} // Podrías pasar datos si haces edición
        >
          <Ionicons name="create-outline" size={22} color="#2563eb" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => confirmarEliminacion(item.id)}
        >
          <Ionicons name="trash-outline" size={22} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estudiantes</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setMostrarModal(true)}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addBtnText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={estudiantes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={mostrarModal} animationType="slide">
        <ModalEstudiante
          onClose={() => {
            setMostrarModal(false);
            cargarEstudiantes();
          }}
        />
      </Modal>

      <Toast />
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  icon: {
    marginLeft: 12,
  },
});
