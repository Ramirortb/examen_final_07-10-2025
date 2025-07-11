import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

import { NotificacionForm } from '../types/notificacion_types';
import {
  obtenerNotificacion,
  eliminarnotificacion,
} from '../services/notificacionService';
import ModalNotificacion from '../components/ModalNotificacion';

export default function NotificacionScreen() {
  const [notificaciones, setNotificaciones] = useState<NotificacionForm[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarNotificaciones = async () => {
    try {
      const data = await obtenerNotificacion();
      setNotificaciones(data);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };

  const confirmarEliminacion = (id: number) => {
    Alert.alert('¿Está seguro de eliminar?', '', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar',
        onPress: async () => {
          await eliminarnotificacion(id);
          Toast.show({ type: 'success', text1: 'Notificación eliminada' });
          cargarNotificaciones();
        },
      },
    ]);
  };

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const renderItem = ({ item }: { item: NotificacionForm }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>ID: {item.id}</Text>
        <Text>Usuario: {item.usuario_id}</Text>
        <Text>Tipo: {item.tipo}</Text>
        <Text>Título: {item.titulo}</Text>
        <Text>Mensaje: {item.mensaje}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setMostrarModal(true)}>
          <Ionicons name="create-outline" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmarEliminacion(item.id)}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.agregarBtn} onPress={() => setMostrarModal(true)}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.agregarText}>Agregar Notificación</Text>
      </TouchableOpacity>

      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay notificaciones registradas</Text>
        }
      />

      <ModalNotificacion visible={mostrarModal} onClose={() => {
        setMostrarModal(false);
        cargarNotificaciones();
      }} />

      <Toast />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  agregarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38a169',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  agregarText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actions: {
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
  },
});

