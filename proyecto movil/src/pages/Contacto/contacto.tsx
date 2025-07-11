import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { obtenerContactos } from './contacto.service';
import { ContactoForm } from './contacto.types';
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message';

import ModalContacto from './ModalContacto'; 
export const ContactoScreen: React.FC = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [contacto, setContacto] = useState<ContactoForm[]>([]);

  const cargarMensajes = async () => {
    try {
      const data = await obtenerContactos();
      setContacto(data);
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'No se pudieron cargar los contactos.' });
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarMensajes();
  };

  const formatoFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const renderItem = ({ item }: { item: ContactoForm }) => (
    <View style={styles.item}>
      <Text style={styles.text}>🆔 ID: {item.id}</Text>
      <Text style={styles.text}>👤 Nombre: {item.nombre}</Text>
      <Text style={styles.text}>✉️ Correo: {item.correo}</Text>
      <Text style={styles.text}>💬 Mensaje: {item.mensaje}</Text>
      <Text style={styles.text}>📅 Fecha: {formatoFecha(item.fecha)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contactos</Text>
        <TouchableOpacity style={styles.addButton} onPress={abrirModal}>
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacto}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={mostrarModal} animationType="slide">
        <ModalContacto onClose={cerrarModal} />
      </Modal>

      <Toast />
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  addText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 6,
  },
  item: {
    backgroundColor: 'white',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
});
