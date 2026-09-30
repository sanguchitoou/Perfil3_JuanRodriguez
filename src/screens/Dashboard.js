import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

import CustomButton from "../components/CustomButton";

const Dashboard = ({ navigation }) => {
  const { user, logout } = useAuth();

  const { users, loadingUsers } = useUsers();

  if (loadingUsers) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />

        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>

          <Text style={styles.headerSubtitle}>
            Usuarios registrados en la aplicación
          </Text>
        </View>
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          Usuarios registrados: {users.length}
        </Text>
      </View>

      {users.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No hay usuarios registrados</Text>

          <Text style={styles.emptyText}>
            Los usuarios registrados aparecerán aquí.
          </Text>
        </View>
      ) : (
        users.map((item) => (
          <View key={item.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              {item.imageUrl ? (
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  style={styles.userImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>
                    {item.nombreCompleto
                      ? item.nombreCompleto.charAt(0).toUpperCase()
                      : "?"}
                  </Text>
                </View>
              )}

              <View style={styles.userMainInfo}>
                <Text style={styles.userName} numberOfLines={2}>
                  {item.nombreCompleto || "Sin nombre"}
                </Text>

                <Text style={styles.userCarnet}>
                  Carnet: {item.carnet || "No registrado"}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Correo</Text>

              <Text style={styles.infoValue} numberOfLines={2}>
                {item.email || "No registrado"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha de nacimiento</Text>

              <Text style={styles.infoValue}>
                {item.fechaNacimiento || "No registrada"}
              </Text>
            </View>
          </View>
        ))
      )}
      <View style={styles.actions}>
        <CustomButton
          title="Mi perfil"
          onPress={() => navigation.navigate("Profile")}
        />

        <CustomButton
          title="Ver planetas de Dragon Ball"
          onPress={() => navigation.navigate("Planets")}
        />

        <CustomButton title="Cerrar sesión" onPress={logout} variant="danger" />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f0ffff",
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

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },

  actions: {
    marginBottom: 18,
  },

  countContainer: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  countText: {
    color: "#525252ff",
    fontSize: 14,
    fontWeight: "700",
  },

  userCard: {
    backgroundColor: "#b8daffff",
    borderRadius: 0,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#000000ff",
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  userImage: {
    width: 64,
    height: 64,
    borderRadius: 5,
    marginRight: 14,
  },

  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 5,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  placeholderText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#2563EB",
  },

  userMainInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 5,
  },

  userCarnet: {
    fontSize: 13,
    color: "#64748B",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  infoRow: {
    marginBottom: 11,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
