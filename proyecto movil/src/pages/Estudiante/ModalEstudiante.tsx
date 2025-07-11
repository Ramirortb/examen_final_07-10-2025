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
import { EstudianteRequest } from './estudiante_types';
import { enviarEstudiante } from './estudiante_service';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const ModalEstudiante: React.FC<Props> = ({ visible, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EstudianteRequest>();

  const onSubmit = async (data: EstudianteRequest) => {
    try {
      await enviarEstudiante(data);
      Toast.show({
        type: 'success',
        text1: 'Estudiante enviado correctamente',
      });
      reset();
      onClose();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al enviar el estudiante',
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Agregar Estudiante</Text>
          <ScrollView>
            {[
              { name: 'nombre_completo', label: 'Nombre Completo' },
              { name: 'correo', label: 'Correo', keyboardType: 'email-address' },
              { name: 'contraseña', label: 'Contraseña' },
              { name: 'tipo_usuario', label: 'Tipo Usuario' },
              { name: 'fecha_registro', label: 'Fecha Registro' },
              { name: 'estado_cuenta', label: 'Estado Cuenta' },
            ].map((field) => (
              <View key={field.name} style={styles.inputGroup}>
                <Text style={styles.label}>{field.label}:</Text>
                <Controller
                  control={control}
                  name={field.name as keyof EstudianteRequest}
                  rules={{ required: `El campo ${field.label} es obligatorio` }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder={field.label}
                      onChangeText={onChange}
                      value={value}
                      keyboardType={field.keyboardType as any}
                    />
                  )}
                />
                {errors[field.name as keyof EstudianteRequest] && (
                  <Text style={styles.error}>
                    {errors[field.name as keyof EstudianteRequest]?.message}
                  </Text>
                )}
              </View>
            ))}
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

export default ModalEstudiante;



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
    marginBottom: 12,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fafafa',
  },
  error: {
    color: '#dc2626',
    fontSize: 13,
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
