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

import { obtenerMensajes, eliminarMensaje } from '../services/mensajeService';
import { Mensaje } from '../types/mensajes.types';
import ModalMensaje from '../components/ModalMensaje';

export default function MensajesScreen() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeEditando, setMensajeEditando] = useState<Mensaje | null>(null);

  const cargarMensajes = async () => {
    try {
      const data = await obtenerMensajes();
      setMensajes(data);
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  const abrirModal = (mensaje?: Mensaje) => {
    setMensajeEditando(mensaje ?? null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMensajeEditando(null);
    setMostrarModal(false);
    cargarMensajes();
  };

  const confirmarEliminacion = (id: number) => {
    Alert.alert('¿Está seguro de eliminar?', '', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar',
        onPress: async () => {
          await eliminarMensaje(id);
          Toast.show({ type: 'success', text1: 'Mensaje eliminado' });
          cargarMensajes();
        },
      },
    ]);
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const renderItem = ({ item }: { item: Mensaje }) => (
    <View style={styles.mensajeCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <Text>{item.contenido}</Text>
      </View>
      <View style={styles.iconos}>
        <TouchableOpacity onPress={() => abrirModal(item)}>
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
      <TouchableOpacity style={styles.agregarBtn} onPress={() => abrirModal()}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.agregarText}>Agregar</Text>
      </TouchableOpacity>

      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay mensajes disponibles</Text>
        }
      />

      <ModalMensaje
        visible={mostrarModal}
        onClose={cerrarModal}
        mensaje={mensajeEditando}
      />

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
  mensajeCard: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  idText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  iconos: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
});
