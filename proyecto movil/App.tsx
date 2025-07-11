import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext";

import Login from "./screens/Login";
import Layout from "./components/Layout";
import Contacto from "./screens/Contacto";
import Mensajes from "./screens/Mensajes";
import Notificacion from "./screens/Notificacion";
import Estudiante from "./screens/Estudiante";
import Solicitud from "./screens/Solicitud";
import Calendario from "./screens/Calendario";
import MensajeChat from "./screens/MensajeChat";
import Permisos from "./screens/Permisos";
import AdmAcademica from "./screens/AdmAcademica";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={Layout}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Contacto" component={Contacto} />
          <Stack.Screen name="Mensajes" component={Mensajes} />
          <Stack.Screen name="Notificacion" component={Notificacion} />
          <Stack.Screen name="Estudiante" component={Estudiante} />
          <Stack.Screen name="Solicitud" component={Solicitud} />
          <Stack.Screen name="Calendario" component={Calendario} />
          <Stack.Screen name="MensajeChat" component={MensajeChat} />
          <Stack.Screen name="Permisos" component={Permisos} />
          <Stack.Screen name="AdmAcademica" component={AdmAcademica} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
