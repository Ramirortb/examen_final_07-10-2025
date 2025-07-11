import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { actualizarMensaje, crearMensaje } from '../services/mensajeService';

interface MensajeForm {
  contenido: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  mensaje?: {
    id: number;
    contenido: string;
  };
}

export default function ModalMensaje({ visible, onClose, mensaje }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MensajeForm>({
    defaultValues: { contenido: mensaje?.contenido || '' },
  });

  const onSubmit = async (data: MensajeForm) => {
    try {
      if (mensaje) {
        await actualizarMensaje(mensaje.id, data.contenido);
        Toast.show({ type: 'success', text1: 'Mensaje actualizado' });
      } else {
        await crearMensaje(data.contenido);
        Toast.show({ type: 'success', text1: 'Mensaje creado' });
      }
      reset();
      onClose();
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error al guardar el mensaje' });
    }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Agregar mensaje</Text>

        <Controller
          control={control}
          name="contenido"
          rules={{ required: 'Mensaje obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Escribe tu mensaje"
              multiline
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.contenido && <Text style={styles.error}>{errors.contenido.message}</Text>}

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
    backgroundColor: '#fff',
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
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
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



