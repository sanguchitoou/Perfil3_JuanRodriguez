import React from "react";

import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PlanetCard from "../components/PlanetCard";
import CustomButton from "../components/CustomButton";
import { usePlanets } from "../hooks/usePlanets";

const Planets = () => {
  const { planets, loadingPlanets, error, refetch } = usePlanets();

  if (loadingPlanets && planets.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#219397" />

        <Text style={styles.loadingText}>Cargando planetas...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={loadingPlanets}
          onRefresh={refetch}
          colors={["#219397"]}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Planetas de Dragon Ball</Text>

        <Text style={styles.subtitle}>
          Datos obtenidos desde la API de Dragon Ball
        </Text>
      </View>

      {error && planets.length === 0 ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>No fue posible cargar los datos</Text>

          <Text style={styles.errorText}>
            Comprueba tu conexión a Internet y vuelve a intentarlo.
          </Text>

          <CustomButton title="Reintentar" onPress={refetch} />
        </View>
      ) : (
        planets.map((planet) => <PlanetCard key={planet.id} planet={planet} />)
      )}
    </ScrollView>
  );
};

export default Planets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2F0FF",
  },

  content: {
    padding: 20,
    paddingBottom: 35,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#64748B",
  },

  errorContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: "#FECACA",
    alignItems: "center",
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#991B1B",
    textAlign: "center",
    marginBottom: 8,
  },

  errorText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 10,
  },
});
