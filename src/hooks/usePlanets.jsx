import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

const PLANETS_API_URL = "https://dragonball-api.com/api/planets";

export const usePlanets = () => {
  const [planets, setPlanets] = useState([]);
  const [loadingPlanets, setLoadingPlanets] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlanets = useCallback(async () => {
    try {
      setLoadingPlanets(true);
      setError(null);

      const response = await fetch(PLANETS_API_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      setPlanets(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error("Error al obtener planetas:", err);

      setError(err);

      Alert.alert(
        "Error",
        "No se pudieron cargar los planetas. Verifica tu conexión e inténtalo nuevamente.",
      );
    } finally {
      setLoadingPlanets(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return {
    planets,
    loadingPlanets,
    error,
    refetch: fetchPlanets,
  };
};
