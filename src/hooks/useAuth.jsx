import { useState, useEffect } from "react";
import { Alert } from "react-native";

import { auth, database } from "../config/firebase";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

// Hook que centraliza toda la lógica de autenticación
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Se dispara al iniciar la app y cada vez que cambia el estado de sesión
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Inicia sesión con correo y contraseña
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      Alert.alert("Error", "Correo o contraseña incorrectos.");
    }
  };

  // Registra un nuevo usuario y almacena sus datos en Firestore
  const register = async (
    email,
    password,
    nombreCompleto,
    fechaNacimiento,
    carnet,
    imageUrl,
  ) => {
    // Validamos los datos antes de crear la cuenta
    if (
      !email.trim() ||
      !password.trim() ||
      !nombreCompleto.trim() ||
      !fechaNacimiento.trim() ||
      !carnet.trim() ||
      !imageUrl.trim()
    ) {
      Alert.alert("Campos incompletos", "Debes completar todos los campos.");

      return;
    }

    try {
      // 1. Creamos el usuario en Firebase Authentication
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const currentUser = credential.user;

      // 2. Actualizamos el perfil básico de Firebase Authentication
      await updateProfile(currentUser, {
        displayName: nombreCompleto.trim(),
        photoURL: imageUrl.trim(),
      });

      // 3. Creamos el documento del usuario en Firestore
      await setDoc(doc(database, "users", currentUser.uid), {
        nombreCompleto: nombreCompleto.trim(),
        fechaNacimiento: fechaNacimiento.trim(),
        carnet: carnet.trim(),
        imageUrl: imageUrl.trim(),
        email: email.trim(),
      });

      Alert.alert("Cuenta creada", "Tu cuenta se creó correctamente.");
    } catch (error) {
      console.error("Error al registrar:", error);

      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Correo registrado",
          "Ya existe una cuenta con este correo.",
        );

        return;
      }

      if (error.code === "auth/invalid-email") {
        Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");

        return;
      }

      if (error.code === "auth/weak-password") {
        Alert.alert(
          "Contraseña débil",
          "La contraseña debe tener al menos 6 caracteres.",
        );

        return;
      }

      Alert.alert("Error", "No se pudo crear la cuenta. Intenta nuevamente.");
    }
  };

  // Cierra la sesión actual
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      Alert.alert("Error", "No se pudo cerrar sesión.");
    }
  };

  return {
    user,
    loadingAuth,
    login,
    register,
    logout,
  };
};
