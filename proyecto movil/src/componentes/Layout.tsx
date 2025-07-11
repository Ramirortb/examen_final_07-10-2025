import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi"; 
import Icon from "react-native-vector-icons/Feather"; 

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { usuario, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    navigation.navigate("Login" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Sistema de Contactos</Text>

        <ScrollView horizontal contentContainerStyle={styles.navLinks}>
          {[
            { name: "Contactos", route: "Contacto" },
            { name: "Mensajes", route: "Mensajes" },
            { name: "Notificación", route: "Notificacion" },
            { name: "Estudiante", route: "Estudiante" },
            { name: "Solicitud", route: "Solicitud" },
            { name: "Chat", route: "MensajeChat" },
            { name: "Calendario", route: "Calendario" },
            { name: "Permisos", route: "Permisos" },
            { name: "Académico", route: "Admacademica" },
          ].map((item) => (
            <TouchableOpacity
              key={item.route}
              onPress={() => navigation.navigate(item.route as never)}
              style={styles.link}
            >
              <Text style={styles.linkText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.userSection}>
          <Text style={styles.userText}>{usuario?.nombre}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.main}>
        {children}
      </View>
    </View>
  );
};






import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  navbar: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  navLinks: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 12,
  },
  link: {
    marginRight: 16,
  },
  linkText: {
    color: "#dbeafe",
    fontWeight: "500",
  },
  userSection: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  main: {
    flex: 1,
    padding: 16,
  },
});

