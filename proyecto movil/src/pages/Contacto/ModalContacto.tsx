import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { ContactoRequest } from './contacto.types';
import { enviarContacto } from './contacto.service';

interface Props {
  onClose: () => void;
  visible: boolean;
}

const ModalContacto: React.FC<Props> = ({ onClose, visible }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoRequest>();

  const onSubmit = async (data: ContactoRequest) => {
    try {
      await enviarContacto(data);
      Toast.show({
        type: 'success',
        text1: 'Mensaje enviado correctamente',
      });
      reset();
      onClose();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al enviar el mensaje',
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Agregar mensaje</Text>
          <ScrollView>
            <Text style={styles.label}>Nombre:</Text>
            <Controller
              control={control}
              name="nombre"
              rules={{ required: 'El nombre es obligatorio' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Tu nombre"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.nombre && (
              <Text style={styles.error}>{errors.nombre.message}</Text>
            )}

            <Text style={styles.label}>Correo electrónico:</Text>
            <Controller
              control={control}
              name="correo"
              rules={{
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Correo no válido',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="tucorreo@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.correo && (
              <Text style={styles.error}>{errors.correo.message}</Text>
            )}

            <Text style={styles.label}>Mensaje:</Text>
            <Controller
              control={control}
              name="mensaje"
              rules={{ required: 'El mensaje es obligatorio' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  multiline
                  placeholder="Escribe tu mensaje aquí"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.mensaje && (
              <Text style={styles.error}>{errors.mensaje.message}</Text>
            )}
          </ScrollView>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </View>
    </Modal>
  );
};

export default ModalContacto;






const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  cancelBtn: {
    backgroundColor: '#e11d48',
    padding: 10,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
