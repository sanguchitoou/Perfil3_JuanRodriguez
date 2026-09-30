import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { collection, onSnapshot } from "firebase/firestore";

import { database } from "../config/firebase";

//Hook que obtiene todos los usuarios registrados
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  //Hacemos fetch para tener todos los usuarios
  useEffect(() => {
    const usersRef = collection(database, "users");

    const unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        const usersList = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setUsers(usersList);
        setLoadingUsers(false);
      },
      (error) => {
        console.error("Error al obtener usuarios:", error);

        Alert.alert("Error", "No se pudieron cargar los usuarios.");

        setLoadingUsers(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return {
    users,
    loadingUsers,
  };
};
