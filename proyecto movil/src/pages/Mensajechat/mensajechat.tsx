import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { obtenerMensajechat, eliminarMensajechat } from '../services/mensajechatService';
import { MensajechatForm } from '../types/mensajechat_types';
import ModalMensajechat from './ModalMensajechat';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function MensajeChatScreen() {
  const [mensajes, setMensajes] = useState<MensajechatForm[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<MensajechatForm | null>(null);

  const cargarMensajes = async () => {
    try {
      const data = await obtenerMensajechat();
      setMensajes(data);
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    }
  };

  const eliminar = (id: number) => {
    Alert.alert('Confirmar eliminación', '¿Estás seguro de eliminar este mensaje?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar',
        onPress: async () => {
          await eliminarMensajechat(id);
          Toast.show({ type: 'success', text1: 'Mensaje eliminado' });
          cargarMensajes();
        },
      },
    ]);
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const abrirModal = (mensaje?: MensajechatForm) => {
    setMensajeSeleccionado(mensaje ?? null);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    cargarMensajes();
  };

  const renderItem = ({ item }: { item: MensajechatForm }) => (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.label}>ID: {item.id}</Text>
        <Text>Remitente: {item.remitente_id}</Text>
        <Text>Destinatario: {item.destinatario_id}</Text>
        <Text>Mensaje: {item.mensaje}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => abrirModal(item)} style={styles.icon}>
          <Ionicons name="create-outline" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eliminar(item.id)} style={styles.icon}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => abrirModal()} style={styles.agregarBtn}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.agregarText}>Agregar Mensaje</Text>
      </TouchableOpacity>

      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay mensajes aún</Text>}
      />

      {mostrarModal && (
        <ModalMensajechat
          visible={mostrarModal}
          onClose={cerrarModal}
          mensajeSeleccionado={mensajeSeleccionado}
        />
      )}
      <Toast />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  row: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: { flex: 1 },
  label: { fontWeight: 'bold' },
  actions: { flexDirection: 'row' },
  icon: { marginHorizontal: 8 },
  agregarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38a169',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  agregarText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
});



