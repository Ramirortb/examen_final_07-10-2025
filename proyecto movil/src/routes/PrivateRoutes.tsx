import React, { ReactNode, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { usuario, loading } = useAuth(); 
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!loading && !usuario) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [usuario, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{usuario ? children : null}</>;
};
