import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { enviarMensajechat } from '../services/mensajechatService';
import type { MensajechatRequest } from '../types/mensajechat_types';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ModalMensajechat({ visible, onClose }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MensajechatRequest>();

  const onSubmit = async (data: MensajechatRequest) => {
    try {
      await enviarMensajechat(data);
      Toast.show({ type: 'success', text1: 'Mensaje enviado con éxito' });
      reset();
      onClose();
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error al enviar el mensaje' });
    }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Agregar Mensaje</Text>

        <Controller
          control={control}
          name="remitente_id"
          rules={{ required: 'El remitente es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Remitente"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.remitente_id && <Text style={styles.error}>{errors.remitente_id.message}</Text>}

        <Controller
          control={control}
          name="destinatario"
          rules={{
            required: 'El destinatario es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Correo no válido',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Destinatario (email)"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.destinatario && <Text style={styles.error}>{errors.destinatario.message}</Text>}

        <Controller
          control={control}
          name="mensaje"
          rules={{ required: 'El mensaje es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Mensaje"
              style={[styles.input, { height: 80 }]}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />
        {errors.mensaje && <Text style={styles.error}>{errors.mensaje.message}</Text>}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
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
  },
  cancelBtn: {
    backgroundColor: '#e53e3e',
    padding: 10,
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: '#3182ce',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
