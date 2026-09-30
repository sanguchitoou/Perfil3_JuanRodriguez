import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

//Importamos los archivos necesarios
import { useAuth } from "../hooks/useAuth";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

const Login = ({ navigation }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.title}>Iniciar sesión</Text>

          <Text style={styles.subtitle}>
            Ingresa tus credenciales para continuar
          </Text>

          <InputField
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="micorreo@ejemplo.com"
            keyboardType="email-address"
          />

          <InputField
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
          />

          <CustomButton
            title="Iniciar sesión"
            onPress={() => login(email, password)}
          />

          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate("Register")}
          >
            ¿No tienes una cuenta?{" "}
            <Text style={styles.registerLink}>Regístrate</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f0ffff",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 15,
  },

  form: {
    width: "100%",
    backgroundColor: "#b8daffff",
    padding: 22,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  registerText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 14,
    marginTop: 22,
  },

  registerLink: {
    color: "#2563EB",
    fontWeight: "700",
  },
});
