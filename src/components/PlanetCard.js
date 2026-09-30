import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PlanetCard = ({ planet }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: planet.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{planet.name}</Text>

          <View
            style={[
              styles.statusBadge,
              planet.isDestroyed ? styles.destroyedBadge : styles.activeBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {planet.isDestroyed ? "Destruido" : "Activo"}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{planet.description}</Text>
      </View>
    </View>
  );
};

export default PlanetCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  image: {
    width: "100%",
    height: 190,
    backgroundColor: "#E2E8F0",
  },

  content: {
    padding: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  activeBadge: {
    backgroundColor: "#DCFCE7",
  },

  destroyedBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
  },
});
