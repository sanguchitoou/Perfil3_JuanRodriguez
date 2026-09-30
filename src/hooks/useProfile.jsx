import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { doc, getDoc, updateDoc } from "firebase/firestore";

import { database } from "../config/firebase";

// Hook que centraliza la lógica del perfil del usuario
export const useProfile = (user) => {
  const [profile, setProfile] = useState({
    nombreCompleto: "",
    fechaNacimiento: "",
    carnet: "",
    imageUrl: "",
    email: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  // Obtiene los datos del usuario desde Firestore
  const loadProfile = async () => {
    if (!user) {
      setLoadingProfile(false);
      return;
    }

    try {
      const userRef = doc(database, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        setProfile({
          ...userSnapshot.data(),
          email: userSnapshot.data().email || user.email || "",
        });
      } else {
        setProfile({
          nombreCompleto: user.displayName || "",
          fechaNacimiento: "",
          carnet: "",
          imageUrl: user.photoURL || "",
          email: user.email || "",
        });
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);

      Alert.alert("Error", "No se pudo cargar la información del perfil.");
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  // Actualiza un campo del formulario
  const updateField = (field, value) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      [field]: value,
    }));
  };

  // Guarda los cambios realizados en Firestore
  const saveProfile = async () => {
    if (!user) {
      return false;
    }

    if (
      !profile.nombreCompleto.trim() ||
      !profile.fechaNacimiento.trim() ||
      !profile.carnet.trim() ||
      !profile.imageUrl.trim()
    ) {
      Alert.alert(
        "Campos incompletos",
        "Todos los campos del perfil son obligatorios.",
      );

      return false;
    }

    try {
      setSavingProfile(true);

      const userRef = doc(database, "users", user.uid);

      await updateDoc(userRef, {
        nombreCompleto: profile.nombreCompleto.trim(),
        fechaNacimiento: profile.fechaNacimiento.trim(),
        carnet: profile.carnet.trim(),
        imageUrl: profile.imageUrl.trim(),
      });

      Alert.alert(
        "Perfil actualizado",
        "La información se actualizó correctamente.",
      );

      return true;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);

      Alert.alert("Error", "No se pudo actualizar el perfil.");

      return false;
    } finally {
      setSavingProfile(false);
    }
  };

  return {
    profile,
    loadingProfile,
    savingProfile,
    updateField,
    saveProfile,
  };
};
