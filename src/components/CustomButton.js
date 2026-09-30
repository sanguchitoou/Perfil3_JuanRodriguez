import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

//Botón reutilizable!!!!
const CustomButton = ({
  title,
  onPress,
  loading = false,
  variant = "primary",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        variant === "danger" && styles.dangerButton,
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "secondary" ? "#2563EB" : "#FFFFFF"}
        />
      ) : (
        <Text
          style={[styles.text, variant === "secondary" && styles.secondaryText]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#219397ff",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  secondaryButton: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#2a8f92ff",
  },

  dangerButton: {
    backgroundColor: "#d600005d",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryText: {
    color: "#2563EB",
  },
});
