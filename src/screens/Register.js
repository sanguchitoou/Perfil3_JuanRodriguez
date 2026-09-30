import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

//Importamos lo necesario!!!
import { useAuth } from "../hooks/useAuth";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

const Register = ({ navigation }) => {
  const { register } = useAuth();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [carnet, setCarnet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    register(
      email,
      password,
      nombreCompleto,
      fechaNacimiento,
      carnet,
      imageUrl,
    );
  };

  //Retornamos el diseño!!!
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Regristrate</Text>

          <Text style={styles.subtitle}>
            Completa tus datos para registrarte
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Nombre completo"
            value={nombreCompleto}
            onChangeText={setNombreCompleto}
            placeholder="Nombre y apellidos"
          />

          <InputField
            label="Fecha de nacimiento"
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="DD/MM/AAAA"
          />

          <InputField
            label="Carnet institucional"
            value={carnet}
            onChangeText={setCarnet}
            placeholder="Ejemplo. 20210001"
          />

          <InputField
            label="URL de imagen"
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://ejemplo.com/imagen.jpg"
            keyboardType="url"
          />

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
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
          />

          <CustomButton title="Registrarme" onPress={handleRegister} />

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            ¿Ya tienes una cuenta?{" "}
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f0ffff",
  },

  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },

  form: {
    width: "100%",
    backgroundColor: "#b8daffff",
    padding: 22,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  loginText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 14,
    marginTop: 22,
  },

  loginLink: {
    color: "#2563EB",
    fontWeight: "700",
  },
});
