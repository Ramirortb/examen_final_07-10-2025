import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { enviarNotificacion } from '../services/notificacion_service';
import type { NotificacionRequest } from '../types/notificacion_types';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ModalNotificacion({ visible, onClose }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificacionRequest>();

  const onSubmit = async (data: NotificacionRequest) => {
    try {
      await enviarNotificacion(data);
      Toast.show({ type: 'success', text1: 'Notificación enviada' });
      reset();
      onClose();
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error al enviar la notificación' });
    }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Nueva Notificación</Text>

        {/* usuario_id */}
        <Controller
          control={control}
          name="usuario_id"
          rules={{ required: 'El usuario es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="ID del usuario"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.usuario_id && <Text style={styles.error}>{errors.usuario_id.message}</Text>}

        {/* tipo */}
        <Controller
          control={control}
          name="tipo"
          rules={{ required: 'El tipo es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Tipo de notificación"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.tipo && <Text style={styles.error}>{errors.tipo.message}</Text>}

        {/* titulo */}
        <Controller
          control={control}
          name="titulo"
          rules={{ required: 'El título es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { height: 60 }]}
              placeholder="Título"
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />
        {errors.titulo && <Text style={styles.error}>{errors.titulo.message}</Text>}

        {/* mensaje */}
        <Controller
          control={control}
          name="mensaje"
          rules={{ required: 'El mensaje es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Contenido del mensaje"
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />
        {errors.mensaje && <Text style={styles.error}>{errors.mensaje.message}</Text>}

        {/* Botones */}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitBtn}>
            <Text style={styles.btnText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#e53e3e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: '#3182ce',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
